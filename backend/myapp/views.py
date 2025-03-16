import re
import random
import string
import json
from django.http import JsonResponse
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from datetime import datetime,date
from django.contrib import messages
from django.db.models import Value,CharField
from django.template.defaulttags import register
# from mysite.settings import EMAIL_HOST_USER
# from django.core.mail import send_mail, EmailMessage


from django.template.loader import render_to_string
from mysite.settings import EMAIL_HOST_USER
from django.core.mail import send_mail, EmailMessage

from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.contrib import auth
from .models import FacultyDetails,StudentDetails,ClassRoom,Announcement,Assignment,ClassroomStudentsList,StudentClassroomList,Attendence,OfflineClass,VaccineStatus
from .serializers import UserSerializer,FacultyDetailsSerializer,StudentDetailsSerializer,ClassRoomSerializer,AnnouncementSerializer,AssignmentSerializer,ClassroomStudentsListSerializer,StudentClassroomListSerializer,AttendenceSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# -----------------------------------
# API Section
# -----------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def faculty_details_list(request):
    if request.method == 'GET':
        faculty_details = FacultyDetails.objects.all()
        serializer = FacultyDetailsSerializer(faculty_details, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_details_list(request):
    if request.method == 'GET':
        student_details = StudentDetails.objects.all()
        serializer = StudentDetailsSerializer(student_details, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def classroom_list(request):
    if request.method == 'GET':
        classrooms = ClassRoom.objects.all()
        serializer = ClassRoomSerializer(classrooms, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = ClassRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def announcement_list(request):
    if request.method == 'GET':
        announcements = Announcement.objects.all()
        serializer = AnnouncementSerializer(announcements, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def assignment_list(request):
    if request.method == 'GET':
        assignments = Assignment.objects.all()
        serializer = AssignmentSerializer(assignments, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def classroom_students_list(request):
    if request.method == 'GET':
        classroom_students = ClassroomStudentsList.objects.all()
        serializer = ClassroomStudentsListSerializer(classroom_students, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = ClassroomStudentsListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def student_classroom_list(request):
    if request.method == 'GET':
        student_classrooms = StudentClassroomList.objects.all()
        serializer = StudentClassroomListSerializer(student_classrooms, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = StudentClassroomListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def attendance_list(request):
    if request.method == 'GET':
        attendances = Attendence.objects.all()
        serializer = AttendenceSerializer(attendances, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = AttendenceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

# -----------------------------------

# Landing Page
def landing(request):
    return render(request,'landing.html')

# -----------------------------------
# Faculty Section
# -----------------------------------


# Login View
def facultyLogin(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        try:
            detail = User.objects.get(email=email)
            username=detail.username
        except:
            username='Temp'
        user = authenticate(username=username, password=password)
        # Roles
        if user is not None:
            login(request, user)
            return redirect('facultyDashboard')
        else:
            messages.error(request, "Invalid Credentials")
            return redirect('facultyLogin')
    return render(request,'faculty/facultyLogin.html')

# Register View
def facultyRegister(request):
    if request.method=='POST':
        first_name = request.POST['fname']
        last_name = request.POST['lname']
        email = request.POST['email']
        password = request.POST['password']
        gender = request.POST['gender']
        dob = request.POST['dob']
        contact = request.POST['contact']
        institute = request.POST['institute']
        state = request.POST['state']
        yearOfStudy = request.POST['yos']
        about = request.POST['about']
        profilePic = request.FILES.get('profilePic')

        print(profilePic)
        # Generating unique username
        num = random.randint(10000000, 99999999)
        str1 = 'EF'
        unique_id = str1 + str(num)
        username=unique_id
        # End Generating unique username

        full_name = first_name + last_name

        if User.objects.filter(email=email).exists():
            messages.error(request,'You Already have an account. Please Log In')
            return redirect('facultyLogin')
        else:
            user = User.objects.create_user(username=username,password=password,email=email,first_name=first_name,last_name=last_name)
            user.is_staff=True;
            user.is_superuser=False;
            user.save()

            u_id = User.objects.get(username=username)

            faculty = FacultyDetails(facultyId=u_id,facultyName=full_name,facultyPhone=contact,facultyGender=gender,facultyDOB = dob,
                            facultyDesc=about,facultyCollege=institute,collegeState=state,experience=yearOfStudy,facultyPic=profilePic)

            faculty.save()

            # Registration Confirmation Email
            role_user_email = user.email
            # role_user_email = 'rahul.agarwal31101999@gmail.com'
            mail_subject = "[Welcome Faculty] - You have successfully registered to VirtualClassroom!!"
            message = render_to_string('register_successful.html', {
                'firstname': user.first_name,
                'lastname': user.last_name,
                'unique_id' : unique_id
            })

            email = EmailMessage(mail_subject, message, from_email=EMAIL_HOST_USER, to=[role_user_email])
            email.send()
            # End Registration Confirmation Email


            messages.success(request,'You are now registered')
            return redirect('facultyLogin')

    return render(request,'faculty/facultyRegister.html')


# Logout View
@login_required
def facultyLogout(request):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        auth.logout(request)
        return render(request, 'faculty/facultyLogout.html')
    else:
        return redirect('facultyLogin')

# Dashboard View
@login_required
def facultyDashboard(request):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        user=request.user
        faculty = FacultyDetails.objects.get(facultyId = user.id)
        classRooms = ClassRoom.objects.filter(classFacultyID=faculty.id)
        unique_id=faculty.facultyId

        # Email Testing
        if request.method=='POST':
            # send_mail(
            #             'Daily Rozgaar',
            #             'Thank you for showing interest in our website. You have been successfully registered. Feel free to call for any house help and avail our facilities at a rational price !',
            #             'rahul.agarwal31101999@gmail.com',
            #             ['adityaverma0198@gmail.com'],
            #             fail_silently = False
            #             )

            role_user_email = 'adityaverma0198@gmail.com'
            mail_subject = "Welcome To VC - Virtual Classroom"
            message = render_to_string('register_successful.html', {
                'user': role_user_email,
                'firstname': user.first_name,
                'lastname': user.last_name,
                'unique_id' : unique_id,
            })

            email = EmailMessage(mail_subject, message, from_email=EMAIL_HOST_USER, to=[role_user_email])
            email.send()

            # End Email Testing


            return redirect(request.path_info)


        # Email Testing Ends


        context={
            'classRooms' : classRooms,
            'userDetails' : faculty
        }
        return render(request,'faculty/facultyDashboard.html',context)
    else:
        return redirect('facultyLogin')


# Profile View
@login_required
def facultyProfile(request):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        user=request.user
        userDetails = FacultyDetails.objects.get(facultyId = user.pk)

        if request.method=='POST':
            contact = request.POST['contact']
            institute = request.POST['institute']
            experience = request.POST['year']
            about = request.POST['about']
            profilePic = request.FILES.get('profilePic')

            userDetails.facultyPhone = contact
            userDetails.facultyCollege = institute

            if 'state' in request.POST:
                state = request.POST['state']
                userDetails.collegeState = state
            else:
                None

            userDetails.experience = experience
            userDetails.facultyDesc = about
            if profilePic:
                userDetails.facultyPic = profilePic

            userDetails.save()
            return redirect(request.path_info)

        context={
            'userDetails' : userDetails,
        }
        return render(request,'faculty/facultyProfile.html',context)
    else:
        return redirect('facultyLogin')


# Classroom Creation View
@login_required
def facultyClassCreate(request):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        # Getting faculty details
        user=request.user
        faculty = FacultyDetails.objects.get(facultyId = user.pk)

        if request.method=='POST':
            className = request.POST['className']
            facultyName = request.POST['faculty']
            department = request.POST['department']
            academicYear = request.POST['year']
            gmeetLink = request.POST['gmeet']

            # unique class id
            classId = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

            # Testing
            # print('---------Testing-------')
            # print('Timetable : ' + timetable)
            # print(faculty.facultyId)
            # print(user.id)

            # Creating classroom Object
            classCreate = ClassRoom(classId=classId, classname=className, classDepartment= department, academicYear=academicYear,
                                    classFacultyID_id = faculty.pk, classFacultyName=faculty.facultyName)

            if gmeetLink is not None:
                classCreate.classLink = gmeetLink

            classCreate.save()
            # End Classroom Created


            # Creating object for ClassroomStudentsList
            # Creating empty dict for the student list
            my_dict = {}
            input = json.dumps(my_dict)
            classroomStudentsList  = ClassroomStudentsList(classId_id = classCreate.pk, studentList = input )
            classroomStudentsList.save()
            # End Creating object for ClassroomStudentsList


            # Creating object for attendence
            attendenceId = str(classCreate.pk)
            attendence = Attendence(attendenceId = attendenceId, classId_id = classCreate.pk)
            attendence.save()
            # End Creating object for attendence

            # Creating object for Offline Classes
            my_dict1 = {}
            input1 = json.dumps(my_dict1)
            offline = OfflineClass(classId_id = classCreate.pk, studentList = input1)
            offline.save()
            # End Creating object for Offline Classes

            messages.success(request,"Classroom Created Successfully")
            return redirect('facultyDashboard')


        context ={
            'faculty' : faculty,
        }
        return render(request,'faculty/facultyClassCreate.html',context)
    else:
        return redirect('facultyLogin')


@register.filter(name='get_start_time')
def get_start_time(d, k):
    # print('-------call------------')
    return d[k][0]

@register.filter(name='get_end_time')
def get_end_time(d, k):
    return d[k][1]

# Faculty Subject
@login_required
def facultySubject(request,pk):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        id=pk
        user=request.user
        classDetails = ClassRoom.objects.get(classId=id)
        userDetails = FacultyDetails.objects.get(facultyId_id = user.pk)
        if request.method=='POST':

            if 'timeSubmit' in request.POST:
                # Getting list of days when class will happen
                timetable = ""
                temp = request.POST.getlist('time')

                # monday = request.POST['monday']
                if 'Monday' in temp:
                    # Storing Day,start_time and end_time as a list
                    timing=[]
                    timing.append('Monday')
                    monday_start = request.POST.get('monday_start',0)
                    monday_end = request.POST.get('monday_end',0)
                    timing.append(monday_start)
                    timing.append(monday_end)
                    timetable += str(timing)
                    timetable += '+'

                # print(monday)

                # tuesday = request.POST.get('tuesday')
                if 'Tuesday' in temp:
                    # Storing Day,start_time and end_time as a timing
                    timing=[]
                    timing.append('Tuesday')
                    tuesday_start = request.POST.get('tuesday_start',0)
                    tuesday_end = request.POST.get('tuesday_end',0)
                    timing.append(tuesday_start)
                    timing.append(tuesday_end)
                    timetable += str(timing)
                    timetable += '+'

                # print(tuesday)

                # wednesday = request.POST['wednesday']
                if 'Wednesday' in temp:
                    # Storing Day,start_time and end_time as a timing
                    timing=[]
                    timing.append('Wednesday')
                    wednesday_start = request.POST.get('wednesday_start',0)
                    wednesday_end = request.POST.get('wednesday_end',0)
                    timing.append(wednesday_start)
                    timing.append(wednesday_end)
                    timetable += str(timing)
                    timetable += '+'


                # thursday = request.POST['thursday']
                if 'Thursday' in temp:
                    # Storing Day,start_time and end_time as a timing
                    timing=[]
                    timing.append('Thursday')
                    thursday_start = request.POST.get('thursday_start',0)
                    thursday_end = request.POST.get('thursday_end',0)
                    timing.append(thursday_start)
                    timing.append(thursday_end)
                    timetable += str(timing)
                    timetable += '+'


                # friday = request.POST['friday']
                if 'Friday' in temp:
                    # Storing Day,start_time and end_time as a timing
                    timing=[]
                    timing.append('Friday')
                    friday_start = request.POST.get('friday_start',0)
                    friday_end = request.POST.get('friday_end',0)
                    timing.append(friday_start)
                    timing.append(friday_end)
                    timetable += str(timing)
                    timetable += '+'

                # saturday = request.POST['saturday']
                if 'Saturday' in temp:
                    # Storing Day,start_time and end_time as a timing
                    timing=[]
                    timing.append('Saturday')
                    saturday_start = request.POST.get('saturday_start',0)
                    saturday_end = request.POST.get('saturday_end',0)
                    timing.append(saturday_start)
                    timing.append(saturday_end)
                    timetable += str(timing)
                    timetable += '+'

                # sunday = request.POST['sunday']
                if 'Sunday' in temp:
                    # Storing Day,start_time and end_time as a timing
                    timing=[]
                    timing.append('Sunday')
                    sunday_start = request.POST.get('sunday_start',0)
                    sunday_end = request.POST.get('sunday_end',0)
                    timing.append(sunday_start)
                    timing.append(sunday_end)
                    timetable += str(timing)
                    timetable += '+'

                if len(timetable) > 0:
                    timetable = timetable[:-1]
                # print(timetable)
                classDetails.classTimeTable = timetable
                classDetails.save()
                return redirect(request.path_info)


            if 'postAnnouncement' in request.POST:
                announcementHeading = request.POST['announcementHeading']
                announcementDescription = request.POST['announcementDescription']

                # print('-------Testing---------')
                # print(announcementDescription)

                temp = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
                announcementId = 'AN' + temp
                newAnnouncement = Announcement(announcementId = announcementId, classId_id = classDetails.pk ,announcementHeading = announcementHeading,
                                                announcementDescription = announcementDescription)

                newAnnouncement.save()
                messages.success(request,"Announcement Posted Successfully")
                return redirect(request.path_info)

            if 'postAssignment' in request.POST:
                assignmentHeading = request.POST['assignmentHeading']
                assignmentDescription = request.POST['assignmentDescription']
                assignmentLink = request.POST['assignmentLink']
                dueDate = request.POST['dueDate']

                temp = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
                assignmentId = 'AS' + temp

                newAssignment = Assignment(assignmentId = assignmentId, classId_id = classDetails.pk ,assignmentHeading = assignmentHeading,
                                                assignmentDescription = assignmentDescription, assignmentLink = assignmentLink, assignmentDueTime = dueDate)

                newAssignment.save()
                messages.success(request,"Assignment Posted Successfully")
                return redirect(request.path_info)

            if 'sendInvite' in request.POST:
                studentId = request.POST['studentId']

                try:
                    student = User.objects.get(username = studentId)
                    email = student.email

                    role_user_email = email

                    mail_subject = "[CLASSROOM INVITE] - You have been invited to join the Classroom"
                    message = render_to_string('classInviteSend.html', {
                        'facultyName': classDetails.classFacultyName,
                        'className' : classDetails.classname,
                        'firstname': student.first_name,
                        'lastname': student.last_name,
                        'classId' : id,
                    })

                    email = EmailMessage(mail_subject, message, from_email=EMAIL_HOST_USER, to=[role_user_email])
                    email.send()
                    messages.success(request,"Invite Sent Successfully")

                    return redirect(request.path_info)
                except:
                    messages.error(request,"Invalid Student ID")
                    return redirect(request.path_info)

                return redirect(request.path_info)


            if 'linkSubmit' in request.POST:
                meetLink = request.POST['meetLink']

                # Saving the changes
                classDetails = ClassRoom.objects.get(classId=id)
                classDetails.classLink = meetLink
                classDetails.save()
                messages.success(request,'Meeting Link Updated')
                return redirect(request.path_info)

            if 'enableOffline' in request.POST:
                vaccine = request.POST['vaccine']
                strength = request.POST['strength']

                classOfflineStatus = OfflineClass.objects.get(classId = id)
                classOfflineStatus.offlineStatus = 'YES'
                classOfflineStatus.vaccineRequired = vaccine
                classOfflineStatus.classStrength = strength
                classOfflineStatus.studentList = '{}'
                classOfflineStatus.save()
                messages.success(request,'Offline Mode Activated')
                return redirect(request.path_info)

            if 'disableOffline' in request.POST:
                classOfflineStatus = OfflineClass.objects.get(classId = id)
                classOfflineStatus.offlineStatus = 'NO'
                classOfflineStatus.vaccineRequired = 0
                classOfflineStatus.classStrength = 0
                classOfflineStatus.studentList = '{}'
                classOfflineStatus.save()
                messages.success(request,'Offline Mode Deactivated')
                return redirect(request.path_info)


            return redirect(request.path_info)

        # Feed List
        announcements = Announcement.objects.filter(classId = classDetails.pk).annotate(type=Value('announcement', CharField()))
        assignments = Assignment.objects.filter(classId = classDetails.pk).annotate(type=Value('assignment', CharField()))
        all_items = list(assignments) + list(announcements)
        all_items_feed = sorted(all_items, key=lambda obj: obj.publishedTime,reverse=True)
        # print(all_items_feed)
        # End Feed List


        # Time Table
        timeTable = {}
        strTime = classDetails.classTimeTable
        try:
            days = strTime.split('+')
            for x in days:
                curr = x.split(',')
                a = curr[0][1:]
                a=a.strip()
                a=a.strip("\'")
                b = curr[1]
                b=b.strip()
                b=b.strip("\'")
                c = curr[2][:len(curr[2])-1]
                c=c.strip()
                c=c.strip("\'")
                timeTable[a] = [b,c]
        except:
            timeTable={}
        # print(timeTable)
        # End Time Table

        classOfflineStatus = OfflineClass.objects.get(classId = id)


        context={
            'class':classDetails,
            'announcements' : announcements,
            'all_items_feed' : all_items_feed,
            'userDetails': userDetails,
            'timeTable':timeTable,
            'classOfflineStatus' : classOfflineStatus
        }
        return render(request,'faculty/facultySubject.html',context)
    else:
        return redirect('facultyLogin')

@login_required
def offlineOptedList(request,pk):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        id = pk

        user=request.user
        userDetails = FacultyDetails.objects.get(facultyId_id = user.pk)

        studentListObject = ClassroomStudentsList.objects.get(classId = id)
        studentListDict = json.loads(studentListObject.studentList)

        studentList = [*studentListDict]
        students = []

        for x in studentList:
            temp = User.objects.get(username = x)
            students.append(temp)

        offlineClass = OfflineClass.objects.get(classId = id)
        offlineList = json.loads(offlineClass.studentList)

        context = {
            'students' : students,
            'offlineList' : offlineList,
            'userDetails':userDetails,
            'id' : id
        }
        return render(request,'faculty/offlineOptedList.html',context)
    else:
        return redirect('facultyLogin')

@login_required
def classMembersList(request,pk):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        id = pk

        user=request.user
        userDetails = FacultyDetails.objects.get(facultyId_id = user.pk)

        studentListObject = ClassroomStudentsList.objects.get(classId = id)
        studentListDict = json.loads(studentListObject.studentList)

        studentList = [*studentListDict]
        students = []

        for x in studentList:
            temp = User.objects.get(username = x)
            students.append(temp)

        context = {
            'students' : students,
            'id' : id,
            'userDetails' : userDetails
        }
        return render(request,'faculty/classMembersList.html',context)
    else:
        return redirect('facultyLogin')

@login_required
def facultyProfileView(request,pk):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        id = pk

        user=request.user
        userDetails = FacultyDetails.objects.get(facultyId_id = user.pk)

        studentUser = User.objects.get(username = id)
        studentDetails = StudentDetails.objects.get(studentId_id =  studentUser.pk)
        context={
            'studentUser' : studentUser,
            'studentDetails' : studentDetails,
            'userDetails':userDetails
        }
        return render(request,'faculty/profileView.html',context)
    else:
        return redirect('facultyLogin')

@login_required
def classAttendence(request,pk):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        id = pk
        studentListObject = ClassroomStudentsList.objects.get(classId = id)
        studentListDict = json.loads(studentListObject.studentList)
        studentList = [*studentListDict]
        students = []

        user=request.user
        userDetails = FacultyDetails.objects.get(facultyId_id = user.pk)

        for x in studentList:
            temp = User.objects.get(username = x)
            students.append(temp)

        # Getting attendence list of the classroom
        attendenceObject = Attendence.objects.get(classId = id)
        attendence = json.loads(attendenceObject.attendenceList)
        studentAttendence =  json.loads(attendenceObject.studentAttendence)

        now = date.today()
        dt_string = now.strftime("%d/%m/%Y")

        status = False
        if dt_string in attendence:
            status = True

        if request.method == 'POST':
            attended = request.POST.getlist('attendence')
            print(attended)

            now = date.today()
            dt_string = now.strftime("%d/%m/%Y")

            # Date already present
            if dt_string in list(attendence):
                attendee = attendence.get(dt_string)   #Getting todays dict of presentee

                for student in attendee:
                    studentAttendence[student] = studentAttendence.get(student,0) - 1

                attendence[dt_string] = {}
                attendee = {}

                for student in attended:          #Traversing todays list of presentee list
                    studentAttendence[student] = studentAttendence.get(student,0) + 1
                    attendee[student]=True
                attendence[dt_string] = attendee

            #Date not present
            else:
                # Update total class conducted
                attendenceObject.totalClassConducted += 1
                temp = {}
                attendence[dt_string] = temp
                attendee = attendence.get(dt_string)   #Getting todays set of presentee
                for student in attended:          #Traversing todays list of presentee list
                    if student not in attendee:
                        studentAttendence[student] = studentAttendence.get(student,0) + 1
                    attendee[student]=True
                attendence[dt_string] = attendee

            attendenceStr = json.dumps(attendence)
            studentAttendenceStr = json.dumps(studentAttendence)
            attendenceObject.attendenceList = attendenceStr
            attendenceObject.studentAttendence = studentAttendenceStr
            attendenceObject.save()

            messages.success(request,'Attendence Updated Successfully')

            return redirect(request.path_info)

        now = date.today()
        dt_string = now.strftime("%d/%m/%Y")
        todayPresent = {}
        # Date already present
        if dt_string in list(attendence):
            todayPresent = attendence[dt_string]
        else:
            todayPresent ={}

        print(attendence)
        context = {
            'students' : students,
            'status' : status,
            'id':id,
            'todayPresent' : todayPresent,
            'userDetails' : userDetails
        }
        return render(request,'faculty/facultyAttendencePage.html',context)
    else:
        return redirect('facultyLogin')




# Function to get assignment Submission link and time
@register.filter
def get_item_link(dictionary, key):
    return dictionary.get(key)[0]

@register.filter
def get_date(dictionary, key):
    return dictionary.get(key)[1]
# Ends

@login_required
def assignmentSubmissions(request,pk):
    if request.user.is_active and request.user.is_staff and not request.user.is_superuser:
        id = pk

        user=request.user
        userDetails = FacultyDetails.objects.get(facultyId_id = user.pk)

        assignment = Assignment.objects.get(assignmentId = id)
        assignmentDict = json.loads(assignment.assignmentSubmission)

        classId = assignment.classId
        studentListObject = ClassroomStudentsList.objects.get(classId = classId)
        studentListDict = json.loads(studentListObject.studentList)
        studentList = [*studentListDict]
        students = []
        for x in studentList:
            temp = User.objects.get(username = x)
            students.append(temp)
        context = {
            'assignments' : assignmentDict,
            'students' : students,
            'userDetails' : userDetails,
            'classId': classId
        }


        return render(request,'faculty/assignmentSubmissionList.html',context)
    else:
        return redirect('facultyLogin')

# -----------------------------------
# Student Section
# -----------------------------------


# Login View
def studentLogin(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            detail = User.objects.get(email=email)
            username=detail.username
        except:
            username='Temp'

        print('Username', username)

        user = authenticate(username=username, password=password)
        # Roles
        if user is not None:
            login(request, user)
            return redirect('studentDashboard')
        else:
            messages.error(request, "Invalid Credentials")
            return redirect('studentLogin')
    return render(request,'student/studentLogin.html')

# Register View
def studentRegister(request):
    if request.method=='POST':
        first_name = request.POST['fname']
        last_name = request.POST['lname']
        email = request.POST['email']
        password = request.POST['password']
        gender = request.POST['gender']
        dob = request.POST['dob']
        contact = request.POST['contact']
        institute = request.POST['institute']
        department = request.POST['department']
        state = request.POST['state']
        yearOfStudy = request.POST['yos']
        about = request.POST['about']
        profilePic = request.FILES.get('profilePic')

        # print(profilePic)
        # Generating unique username
        num = random.randint(10000000, 99999999)
        str1 = 'ES'
        unique_id = str1 + str(num)
        username=unique_id
        # End Generating unique username

        full_name = first_name + last_name

        if User.objects.filter(email=email).exists():
            messages.error(request,'You Already have an account. Please Log In')
            return redirect('studentLogin')
        else:
            user = User.objects.create_user(username=username,password=password,email=email,first_name=first_name,last_name=last_name)
            user.is_staff=False;
            user.is_superuser=False;
            user.save()

            u_id = User.objects.get(username=username)

            student = StudentDetails(studentId=u_id,studentName=full_name,studentPhone=contact,studentGender=gender,studentDOB = dob,
                            studentDesc=about,studentCollege=institute,collegeState=state,yearOfStudy=yearOfStudy,studentPic=profilePic,studentDepartment = department)

            student.save()

            # Creating StudentClassroomList object
            my_dict={}
            input = json.dumps(my_dict)
            studentClassroomList = StudentClassroomList(studentId_id = user.pk, classList = input)
            studentClassroomList.save()
            # End Creating StudentClassroomList object


            # Registration Confirmation Email
            role_user_email = user.email
            # role_user_email = 'rahul.agarwal31101999@gmail.com'
            mail_subject = "[Welcome Student] - You have successfully registered to VirtualClassroom!!"
            message = render_to_string('register_successful.html', {
                'firstname': user.first_name,
                'lastname': user.last_name,
                'unique_id' : unique_id
            })

            email = EmailMessage(mail_subject, message, from_email=EMAIL_HOST_USER, to=[role_user_email])
            email.send()
            # End Registration Confirmation Email

            messages.success(request,'You are now registered')
            return redirect('studentLogin')
    return render(request,'student/studentRegister.html')

# Logout View
@login_required
def studentLogout(request):
    if request.user.is_active and not request.user.is_staff and not request.user.is_superuser:
        auth.logout(request)
        return render(request, 'student/studentLogout.html')
    else:
        return redirect('studentLogin')


# Dashboard View
@login_required
def studentDashboard(request):
    if request.user.is_active and not request.user.is_staff and not request.user.is_superuser:

        # Getting user details
        user = request.user
        student = StudentDetails.objects.get(studentId = user.pk)
        userDetails = StudentDetails.objects.get(studentId = user.pk)

        # Getting classroom list joined by student
        classRoomList = StudentClassroomList.objects.get(studentId_id = user.pk)
        dict = json.loads(classRoomList.classList)
        temp = [*dict]
        classList =[]
        for x in temp:
            temp = ClassRoom.objects.get(classId = x)
            classList.append(temp)
        # ends

        if request.method == 'POST':
            if 'classJoin' in request.POST:
                classId = request.POST['classJoinCode']

                # datetime object containing current date and time
                now = datetime.now()
                # dd/mm/YY H:M:S format
                dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

                try:
                    getClass = ClassRoom.objects.get(classId = classId)
                except:
                    messages.error(request,"Invalid Class Code")
                    return redirect(request.path_info)


                try:
                    list = StudentClassroomList.objects.get(studentId = user.pk)
                    my_dict = json.loads(list.classList)
                    if classId in my_dict.keys():
                        return redirect('studentSubject',pk=classId)
                    else:
                        # print('----student not in classroom-------')
                        # classroom  added in student list of StudentClassroomList
                        my_dict[classId] = dt_string
                        input = json.dumps(my_dict)
                        list.classList = input
                        list.save()
                        # ends

                        # student addid in classroom list of ClassroomStudentsList
                        studentId_str = str(student.studentId)
                        classroomStudentsList = ClassroomStudentsList.objects.get(classId = classId)
                        studentList = classroomStudentsList.studentList
                        print(studentList)
                        my_dict = json.loads(studentList)
                        my_dict[studentId_str] = dt_string
                        input = json.dumps(my_dict)
                        classroomStudentsList.studentList = input
                        classroomStudentsList.save()
                        # ends
                        messages.success(request,"Classroom joined successfully")
                        return redirect('studentSubject',pk=classId)
                    return redirect(request.path_info)

                except(StudentClassroomList.DoesNotExist):
                    my_dict={}
                    my_dict[classId] = dt_string
                    input = json.dumps(my_dict)
                    list = StudentClassroomList(studentId_id = user.pk,classList = input)
                    list.save()
                    return redirect('studentSubject',pk=classId)

                return redirect(request.path_info)    # classJoin post ends
            return redirect(request.path_info)   #  post ends

        context={
            'classList' : classList,
            'userDetails' : userDetails
        }
        return render(request,'student/studentDashboard.html',context)

    else:
        return redirect('studentLogin')

# Profile View
@login_required
def studentProfile(request):
    if request.user.is_active and not request.user.is_staff and not request.user.is_superuser:
        user=request.user
        userDetails = StudentDetails.objects.get(studentId = user.pk)

        if request.method=='POST':
            contact = request.POST['contact']
            institute = request.POST['institute']
            state = request.POST['state']
            yos = request.POST['year']
            about = request.POST['about']
            department = request.POST['department']
            profilePic = request.FILES.get('profilePic')


            userDetails.studentPhone = contact
            userDetails.studentCollege = institute
            userDetails.collegeState = state
            userDetails.yearOfStudy = yos
            userDetails.studentDesc = about
            userDetails.studentDepartment = department

            if profilePic:
                userDetails.studentPic = profilePic

            userDetails.save()

            try:
                vaccine = VaccineStatus.objects.get(userId_id = user.pk)
                if 'vaccineDose' in request.POST:
                    totalDose = request.POST['vaccineDose']
                    vaccine.vaccineDose = totalDose
                else:
                    None
                vaccine.save()
            except:
                vaccine = VaccineStatus(userId_id = user.pk)
                if 'vaccineDose' in request.POST:
                    totalDose = request.POST['vaccineDose']
                    vaccine.vaccineDose = totalDose
                else:
                    None
                vaccine.save()


            return redirect(request.path_info)

        dose = 0
        try:
            vaccine = VaccineStatus.objects.get(userId = user.pk)
            print('------in-------')
            dose = vaccine.vaccineDose
        except:
            dose = 0

        context={
            'userDetails' : userDetails,
            'dose' : dose
        }
        return render(request,'student/studentProfile.html',context)
    else:
        return redirect('studentLogin')

# Student Subject View
@login_required
def studentSubject(request,pk):
    if request.user.is_active and not request.user.is_staff and not request.user.is_superuser:
        id=pk
        classDetails = ClassRoom.objects.get(classId=id)
        user=request.user
        userDetails = StudentDetails.objects.get(studentId = user.pk)
        # announcements = Announcement.objects.filter(classId = id)

        attendenceObject = Attendence.objects.get(classId = id)
        attendenceList = json.loads(attendenceObject.studentAttendence)

        totalConducted = attendenceObject.totalClassConducted
        totalAttended = 0

        if user.username in attendenceList:
            totalAttended = int(attendenceList.get(user.username,0))

        totalAbsent = totalConducted - totalAttended
        if totalConducted > 0:
            attendencePercent = round((totalAttended/totalConducted)*100,1)
        else:
            attendencePercent = 0

        record = []
        record.append(totalConducted)
        record.append(totalAttended)

        if request.method == 'POST':
            if 'postSubmission' in request.POST:

                assignmentId = request.POST['assignmentId']
                assignmentSubmission = request.POST['assignmentLink']

                assignment = Assignment.objects.get(assignmentId = assignmentId)
                dict = json.loads(assignment.assignmentSubmission)

                now = datetime.now()
                # dd/mm/YY H:M:S format
                dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
                dict[str(userDetails)] = [assignmentSubmission,dt_string]
                input = json.dumps(dict)
                assignment.assignmentSubmission = input;
                assignment.save()

                messages.success(request,"Assignment Submitted Successfully")
                return redirect(request.path_info)

            if 'optOffline' in request.POST:
                offline = OfflineClass.objects.get(classId_id = id)
                stu_list = json.loads(offline.studentList)
                stu_list[user.username] = True
                offline.studentList = json.dumps(stu_list)
                offline.save()
                messages.success(request,"Opted for Offline Mode")
                return redirect(request.path_info)

            if 'optOnline' in request.POST:
                offline = OfflineClass.objects.get(classId_id = id)
                stu_list = json.loads(offline.studentList)

                if user.username in stu_list:
                    del stu_list[user.username]
                else:
                    None
                offline.studentList = json.dumps(stu_list)
                offline.save()

                messages.success(request,"Opted for Online Mode")
                return redirect(request.path_info)

            return redirect(request.path_info)

        # Feeds
        announcements = Announcement.objects.filter(classId = id).annotate(type=Value('announcement', CharField()))
        assignments = Assignment.objects.filter(classId = id).annotate(type=Value('assignment', CharField()))
        all_items = list(assignments) + list(announcements)
        all_items_feed = sorted(all_items, key=lambda obj: obj.publishedTime,reverse=True)
        # End Feeds


        # Time teble
        timeTable = {}
        strTime = classDetails.classTimeTable
        try:
            days = strTime.split('+')
            for x in days:
                curr = x.split(',')
                a = curr[0][1:]
                a=a.strip()
                a=a.strip("\'")
                b = curr[1]
                b=b.strip()
                b=b.strip("\'")
                c = curr[2][:len(curr[2])-1]
                c=c.strip()
                c=c.strip("\'")
                timeTable[a] = [b,c]
        except:
            timeTable={}
        # print(timeTable)
        # End Time Table

        # Offline Status
        classOfflineStatus = OfflineClass.objects.get(classId = id)

        eligible = False
        available = False
        opted = False
        try:
            vaccineStatus = VaccineStatus.objects.get(userId_id = user.pk)
            if vaccineStatus.vaccineDose >= classOfflineStatus.vaccineRequired:
                eligible = True
            else:
                eligible = False
        except:
            eligible = False

        if classOfflineStatus.offlineStatus == 'NO':
            None
        else:
            classroomStudent = ClassroomStudentsList.objects.get(classId = id)
            temp = json.loads(classroomStudent.studentList)
            totalClassStrength = len(temp)

            totalSeat = int((totalClassStrength * classOfflineStatus.classStrength)/100)
            temp1 = json.loads(classOfflineStatus.studentList)
            totalBooked = len(temp1)
            if user.username in temp1:
                opted = True

            if totalBooked < totalSeat:
                available = True
            else:
                available = False
        # End Offline Class

        # eligible= True
        context={
            'class' : classDetails,
            'all_items_feed' : all_items_feed,
            'totalConducted' : totalConducted,
            'totalAttended' : totalAttended,
            'totalAbsent' : totalAbsent,
            'attendencePercent' : attendencePercent,
            'userDetails' : userDetails,
            'timeTable' : timeTable,
            'classOfflineStatus' : classOfflineStatus,
            'eligible' : eligible,
            'available' : available,
            'opted':opted
        }
        return render(request,'student/studentSubject.html',context)
    else:
        return redirect('studentLogin')

# Assignment View
@login_required
def studentAssignment(request):
    if request.user.is_active and not request.user.is_staff and not request.user.is_superuser:
        return render(request,'student/studentAssignment.html')
    else:
        return redirect('studentLogin')
