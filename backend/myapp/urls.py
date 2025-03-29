from django.urls import path
from . import views


urlpatterns = [
    path('',views.landing,name="landing"),
    
    # Faculty URL patterns
    path('faculty_login/',views.facultyLogin,name="facultyLogin"),
    path('faculty_register/',views.facultyRegister,name="facultyRegister"),
    
    path('faculty_dashboard/',views.facultyDashboard,name='facultyDashboard'),
    path('faculty_profile/',views.facultyProfile,name='facultyProfile'),
    path('faculty_classCreate/',views.facultyClassCreate,name='facultyClassCreate'),

    path('faculty_logout/',views.facultyLogout,name='facultyLogout'),
    
    # Student URL patterns
    path('student_login/',views.studentLogin,name="studentLogin"),
    path('student_register/',views.studentRegister,name="studentRegister"),
    path('student_dashboard/',views.studentDashboard,name='studentDashboard'),
    path('student_profile/',views.studentProfile,name='studentProfile'),
    path('student_logout/',views.studentLogout,name='studentLogout'),
    
    # API Endpoints for Faculty
    path('api/faculty/assignments/<int:pk>/submissions/', views.assignmentSubmissions, name='api_assignment_submissions'),
    path('api/faculty/classes/<int:pk>/attendance/', views.classAttendence, name='api_class_attendance'),
    path('api/faculty/classes/<int:pk>/members/', views.classMembersList, name='api_class_members'),
    path('api/faculty/classes/<int:pk>/offline-opted/', views.offlineOptedList, name='api_offline_opted_list'),
    path('api/faculty/subjects/<int:pk>/', views.facultySubject, name='api_faculty_subject'),
    path('api/faculty/profiles/<int:pk>/', views.facultyProfileView, name='api_faculty_profile_view'),
    
    
    path('api/faculty/register/', views.facultyRegister, name='api_faculty_register'),
    path('api/faculty/login/', views.facultyLogin, name='api_faculty_login'),
    path('api/faculty/dashboard/', views.facultyDashboard, name='api_faculty_dashboard'),
    path('api/faculty/profile/', views.facultyProfile, name='api_faculty_profile'),
    path('api/faculty/class/', views.facultyClassCreate, name='api_faculty_class_create'),
    path('api/faculty/logout/',views.facultyLogout,name='api_faculty_logout'),

    # Api endpoints for student
    path('api/student/register/', views.studentRegister, name='api_student_register'),
    path('api/student/login/', views.studentLogin, name='api_student_login'),
    path('api/student/dashboard/', views.studentDashboard, name='api_student_dashboard'),
    path('api/student/profile/', views.studentProfile, name='api_student_profile'),
    path('api/student/subjects/<int:pk>/', views.studentSubject, name='api_student_subject'),
    path('api/student/assignments/', views.studentAssignment, name='api_student_assignment'),
    path('api/student/logout/',views.studentLogout,name='api_student_logout'),
]
