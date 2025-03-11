from django.urls import path
from . import views

urlpatterns = [
    path('',views.landing,name="landing"),


    path('faculty_login/',views.facultyLogin,name="facultyLogin"),
    path('faculty_register/',views.facultyRegister,name="facultyRegister"),
    # path('faculty_details/',views.facultyDetails,name='facultyDetails'),
    path('faculty_dashboard/',views.facultyDashboard,name='facultyDashboard'),
    path('faculty_profile/',views.facultyProfile,name='facultyProfile'),
    path('faculty_classCreate/',views.facultyClassCreate,name='facultyClassCreate'),
    path('assignment_submissions/<pk>',views.assignmentSubmissions,name='assignmentSubmissions'),
    path('class_attendence/<pk>',views.classAttendence,name='classAttendence'),
    path('class_members/<pk>',views.classMembersList,name='classMembersList'),
    path('offline_opted_list/<pk>',views.offlineOptedList,name='offlineOptedList'),
    path('faculty_subject/<pk>',views.facultySubject,name='facultySubject'),
    path('faculty_profileView/<pk>',views.facultyProfileView,name='facultyProfileView'),
    path('faculty_logout/',views.facultyLogout,name='facultyLogout'),



    path('student_login/',views.studentLogin,name="studentLogin"),
    path('student_register/',views.studentRegister,name="studentRegister"),
    # path('student_details/',views.studentDetails,name='studentDetails'),
    path('student_dashboard/',views.studentDashboard,name='studentDashboard'),
    path('student_profile/',views.studentProfile,name='studentProfile'),
    path('student_subject/<pk>',views.studentSubject,name='studentSubject'),
    path('student_assignment/',views.studentAssignment,name='studentAssignment'),
    path('student_logout/',views.studentLogout,name='studentLogout'),
]
