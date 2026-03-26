document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    if (!bookingForm) return;

    const steps = bookingForm.querySelectorAll('.form-step');
    const nextBtns = bookingForm.querySelectorAll('.next-btn');
    const prevBtns = bookingForm.querySelectorAll('.prev-btn');
    const progress = document.querySelector('.progress-bar');
    let currentStep = 0;

    const updateStep = () => {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
        
        if (progress) {
            const percent = (currentStep / (steps.length - 1)) * 100;
            progress.style.width = `${percent}%`;
        }
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStep();
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateStep();
            }
        });
    });
});
