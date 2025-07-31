from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import ContactForm

def home(request):
    form = ContactForm()
    if request.method == 'POST':
        print("🟡 POST request received")
        form = ContactForm(request.POST)
        if form.is_valid():
            print("🟢 Form is valid")
            try:
                send_mail(
                    form.cleaned_data['subject'],
                    f"From: {form.cleaned_data['name']} <{form.cleaned_data['email']}>\n\n{form.cleaned_data['message']}",
                    form.cleaned_data['email'],
                    ['m.mandal20048295@gmail.com']
                )
                if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                    print("🔵 AJAX request detected")
                    return JsonResponse({'success': True})
                else:
                    print("🟣 Non-AJAX POST, redirecting")
                    return redirect('home')
            except Exception as e:
                print(f"🔴 Email send failed: {e}")
                return JsonResponse({'success': False}, status=500)
        else:
            print("🔴 Form is invalid")
            return JsonResponse({'success': False, 'error': 'Invalid form'}, status=400)

    print("⚪ GET request - rendering form")
    return render(request, 'index.html', {'form': form})
