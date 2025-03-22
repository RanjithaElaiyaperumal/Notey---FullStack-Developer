# from django.urls import path 
# from .import views 



# urlpatterns = [
#     path("notes/", views.notes, name="notes"),
#     path("notes/<int:id>/", views.note_detail, name="note-detail"),
#     path("notes-search/", views.search_notes, name='notes-search'),
#     # path("notesdelete/<slug:slug>/",views.note_detail,name="note-delete")
# ]

# endpoints:
# GET_ALL_NOTES_and_CREATE_NEW_NOTE = "127.0.0.1:8000/notes/"
# GET_SPECIFIC_NOTE = "127.0.0.1:8000/notes/note-slug"
# SEARCH_NOTES = "127.0.0.1:8000/notes-search/?search=meeting"



from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.notes, name="notes"),
    path("notes/<int:id>/", views.note_detail, name="note-detail"),  # Changed `slug` to `id`
    path("notes/search/", views.search_notes, name="search-notes"),
    path("notes/<int:id>/", views.note_detail, name="note-detail"),  # Fixed delete path
]
