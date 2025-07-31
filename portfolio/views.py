from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render,redirect
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
                if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                    return JsonResponse({'success': True})
                else:
                    return redirect('home')  # fallback for non-AJAX
            except:
                return JsonResponse({'success': False}, status=500)

    return render(request, 'index.html', {'form': form})
