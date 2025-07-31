from django.core.mail import send_mail
from django.contrib import messages
from django.shortcuts import render, redirect
from .forms import ContactForm

def home(request):
    form = ContactForm()
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            try:
                send_mail(
                    form.cleaned_data['subject'],
                    f"From: {form.cleaned_data['name']} <{form.cleaned_data['email']}>\n\n{form.cleaned_data['message']}",
                    form.cleaned_data['email'],
                    ['m.mandal20048295@gmail.com']
                )
                messages.success(request, "Message sent successfully!")
            except:
                messages.error(request, "Something went wrong while sending the message.")
            return redirect('home')  # Redirect to clear POST data
    return render(request, 'index.html', {'form': form})
