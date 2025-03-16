from rest_framework import serializers
from .models import StudentDetails, FacultyDetails, Classroom, Announcement, Assignment, Attendence, OfflineClass, VaccineStatus, ClassroomStudentsList

class StudentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDetails
        fields = '__all__'

class FacultyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyDetails
        fields = '__all__'

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class AttendenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendence
        fields = '__all__'

class OfflineClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfflineClass
        fields = '__all__'

class VaccineStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaccineStatus
        fields = '__all__'

class ClassroomStudentsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassroomStudentsList
        fields = '__all__'