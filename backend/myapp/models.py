from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from phonenumber_field.modelfields import PhoneNumberField


class FacultyDetails(models.Model):
    facultyId = models.ForeignKey(User,on_delete=models.CASCADE)
    facultyName = models.CharField(max_length=100,null=False)
    facultyPhone = PhoneNumberField(null=False, blank=False, unique=False, default='+91')
    facultyGender = models.CharField(max_length=20,null=True)
    facultyDOB = models.DateTimeField(default=datetime.now,null=True)
    # user_pass = models.CharField(max_length=10, blank=True)
    # user_unique = models.CharField(max_length=100,null=True)
    facultyDesc = models.TextField(blank=False,null=True)
    facultyCollege = models.CharField(max_length=100,null=False)
    collegeState = models.CharField(max_length=50,null=False)
    experience = models.CharField(max_length=20,null=True)
    facultyPic = models.ImageField(upload_to='facultyPic/', null=True, blank=True)
    user_date = models.DateTimeField(default=datetime.now,null=True)

    def __str__(self):
        return str(self.facultyId) if self.facultyId else ''


class StudentDetails(models.Model):
    studentId = models.ForeignKey(User,on_delete=models.CASCADE)
    studentName = models.CharField(max_length=100,null=False)
    studentPhone = PhoneNumberField(null=False, blank=False, unique=False, default='+91')
    studentGender = models.CharField(max_length=20,null=False)
    studentDOB = models.DateTimeField(default=datetime.now,null=True)
    studentDepartment = models.CharField(max_length = 50, blank= True, null= True, default=' ')
    # user_pass = models.CharField(max_length=10, blank=True)
    # user_unique = models.CharField(max_length=100,null=True)
    studentDesc = models.TextField(blank=False,null=True)
    studentCollege = models.CharField(max_length=100,null=False)
    collegeState = models.CharField(max_length=50,null=False)
    yearOfStudy = models.CharField(max_length=20,null=True)
    studentPic = models.ImageField(upload_to='StudentPic/', null=True, blank=True)
    user_date = models.DateTimeField(default=datetime.now,null=True)

    def __str__(self):
        return str(self.studentId) if self.studentId else ''

class ClassRoom(models.Model):
    classId = models.CharField(max_length=10,primary_key=True)
    classname = models.CharField(max_length=50,null=False)
    classDepartment = models.CharField(max_length=50,null=False)
    academicYear = models.CharField(max_length=20,null=False)
    classLink = models.TextField(blank=False,null=True)
    classFacultyID = models.ForeignKey(FacultyDetails,on_delete=models.CASCADE)
    classFacultyName = models.CharField(max_length=100,null=False)
    classTimeTable = models.TextField(blank=True,null=True,default="")
    classCreationTime = models.DateTimeField(default=datetime.now,null=True)

    def __str__(self):
        return str(self.classId) if self.classId else ''

class Announcement(models.Model):
    announcementId = models.CharField(max_length=10,primary_key=True)
    classId = models.ForeignKey(ClassRoom,on_delete=models.CASCADE)
    announcementHeading = models.CharField(max_length=50,null=False)
    announcementDescription = models.TextField(blank=False,null=False)
    publishedTime = models.DateTimeField(default=datetime.now,null=True)

    def __str__(self):
        return str(self.announcementId) if self.announcementId else ''


class Assignment(models.Model):
    assignmentId = models.CharField(max_length=10,primary_key=True)
    classId = models.ForeignKey(ClassRoom,on_delete=models.CASCADE)
    assignmentHeading = models.CharField(max_length=50,null=False)
    assignmentDescription = models.TextField(blank=False,null=False)
    publishedTime = models.DateTimeField(default=datetime.now,null=True)
    assignmentDueTime = models.DateTimeField(default=datetime.now,null=True)
    assignmentLink = models.TextField(blank=True,null=True)
    assignmentSubmission = models.TextField(null=True, blank=True, default='{}')

    def __str__(self):
        return str(self.assignmentId) if self.assignmentId else ''

# Table storing Attendence of classroom
class Attendence(models.Model):
    attendenceId = models.CharField(max_length=20,primary_key=True)
    classId = models.ForeignKey(ClassRoom,on_delete=models.CASCADE)
    totalClassConducted = models.BigIntegerField(null=True,blank=True,default=0)
    attendenceList = models.TextField(blank=True,null=True,default='{}')
    studentAttendence = models.TextField(blank=True,null=True,default='{}')

    def __str__(self):
        return str(self.classId) if self.classId else ''


# Table storing List of classroom joined by students
class StudentClassroomList(models.Model):
    studentId = models.ForeignKey(User,on_delete=models.CASCADE)
    classList = models.TextField(blank=True,null=True)

    def __str__(self):
        return str(self.studentId) if self.studentId else ''


# Table storing List of classroom joined by students
class ClassroomStudentsList(models.Model):
    classId = models.ForeignKey(ClassRoom,on_delete=models.CASCADE)
    studentList = models.TextField(blank=True,null=True)

    def __str__(self):
        return str(self.classId) if self.classId else ''

class VaccineStatus(models.Model):
    userId = models.ForeignKey(User,on_delete=models.CASCADE)
    vaccineDose = models.IntegerField(null=True,blank=True,default=0)

    def __str__(self):
        return str(self.userId) if self.userId else ''

class OfflineClass(models.Model):
    classId = models.ForeignKey(ClassRoom,on_delete=models.CASCADE)
    offlineStatus = models.CharField(max_length=20,null=True,blank=True,default='NO')
    vaccineRequired = models.IntegerField(null=True,blank=True,default=0)
    classStrength = models.IntegerField(null=True,blank=True,default=0)
    studentList = models.TextField(blank=True,null=True)

    def __str__(self):
        return str(self.classId) if self.classId else ''
