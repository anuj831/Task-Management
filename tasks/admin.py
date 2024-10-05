from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'completed')  # Fields to display in the admin panel

admin.site.register(Task, TaskAdmin)
