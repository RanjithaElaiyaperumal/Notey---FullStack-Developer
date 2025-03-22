from django.db import models
from django.utils.text import slugify

class Note(models.Model):

    CATEGORY = (
        ('BUSINESS', 'Business'),
        ('PERSONAL', 'Personal'),
        ('IMPORTANT', 'Important'),
    )

    title = models.CharField(max_length=100)
    body = models.TextField()
    slug = models.SlugField(unique=True, blank=True, null=True)  # Removed `null=True`
    category = models.CharField(max_length=15, choices=CATEGORY, default="PERSONAL")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # First save to get an ID
        if not self.slug:
            super().save(*args, **kwargs)  # Save to assign an ID
        
        if not self.s:
            slug_base = slugify(self.title)
            self.slug = f"{slug_base}-{self.id}"  # Append the ID
        
        super().save(*args, **kwargs)  # Save again with the slug






