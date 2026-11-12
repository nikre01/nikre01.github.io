/**
 * Nikita Dhakar — Java Full-Stack Portfolio
 * Interactive Architecture Pipeline & Portfolio Utilities
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Interactive UPI Architecture Flow Simulation (Pin 4 Style)
  // ==========================================================================
  const runPipelineDemoBtn = document.getElementById('runPipelineDemoBtn');
  const pipelineLogText = document.getElementById('pipelineLogText');
  const nodes = [
    document.getElementById('node1'),
    document.getElementById('node2'),
    document.getElementById('node3'),
    document.getElementById('node4')
  ];

  if (runPipelineDemoBtn && pipelineLogText) {
    runPipelineDemoBtn.addEventListener('click', () => {
      runPipelineDemoBtn.disabled = true;
      runPipelineDemoBtn.style.opacity = '0.6';

      // Reset nodes
      nodes.forEach(n => {
        if (n) {
          n.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          n.style.background = '#181d2a';
        }
      });

      pipelineLogText.textContent = '[STEP 1/4] HTTP Ingress: Parsing payment request (₹1,200.00 from rahul@oksbi)...';
      if (nodes[0]) {
        nodes[0].style.borderColor = '#ff5722';
        nodes[0].style.background = 'rgba(255, 87, 34, 0.12)';
      }

      setTimeout(() => {
        pipelineLogText.textContent = '[STEP 2/4] Concurrency Control: Acquired synchronized pessimistic row lock on account [rahul@oksbi]...';
        if (nodes[1]) {
          nodes[1].style.borderColor = '#ff5722';
          nodes[1].style.background = 'rgba(255, 87, 34, 0.12)';
        }
      }, 700);

      setTimeout(() => {
        pipelineLogText.textContent = '[STEP 3/4] MySQL Persistence: Parameterized JDBC update executed (balance - 1200 / + 1200)...';
        if (nodes[2]) {
          nodes[2].style.borderColor = '#ff5722';
          nodes[2].style.background = 'rgba(255, 87, 34, 0.12)';
        }
      }, 1400);

      setTimeout(() => {
        const txnId = 'TXN-UPI-' + Math.floor(100000 + Math.random() * 900000);
        pipelineLogText.textContent = `[STEP 4/4] Commit Verified: Hash [${txnId}] generated • Status: SETTLED (Latency: 21ms).`;
        if (nodes[3]) {
          nodes[3].style.borderColor = '#10b981';
          nodes[3].style.background = 'rgba(16, 185, 129, 0.15)';
        }

        showToast(`Simulation complete: ${txnId} SETTLED`);
        runPipelineDemoBtn.disabled = false;
        runPipelineDemoBtn.style.opacity = '1';
      }, 2100);
    });
  }

  // ==========================================================================
  // 2. Toast Notification Hub
  // ==========================================================================
  const toastNotification = document.getElementById('toastNotification');

  const showToast = (message) => {
    if (!toastNotification) return;
    toastNotification.innerHTML = '';
    const toast = document.createElement('div');
    toast.className = 'toast-pill-message';
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    toastNotification.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  };

  // ==========================================================================
  // 3. Copy Email to Clipboard
  // ==========================================================================
  const copyEmailHeroBtn = document.getElementById('copyEmailHeroBtn');
  const copyEmailHeroLabel = document.getElementById('copyEmailHeroLabel');

  if (copyEmailHeroBtn) {
    copyEmailHeroBtn.addEventListener('click', () => {
      const email = 'nikitadhakar19@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Copied: nikitadhakar19@gmail.com');
        if (copyEmailHeroLabel) {
          const original = copyEmailHeroLabel.textContent;
          copyEmailHeroLabel.textContent = 'Copied to clipboard!';
          setTimeout(() => {
            copyEmailHeroLabel.textContent = original;
          }, 2000);
        }
      }).catch(() => {
        showToast('nikitadhakar19@gmail.com');
      });
    });
  }

  // ==========================================================================
  // 4. Download Resume Button
  // ==========================================================================
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      showToast('Contact: nikitadhakar19@gmail.com');
    });
  }

  // ==========================================================================
  // 5. Mobile Navigation Drawer
  // ==========================================================================
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileNavToggle && mobileDrawer) {
    mobileNavToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });

    document.querySelectorAll('.m-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }

  // ==========================================================================
  // 6. Direct Contact Form Mailto Bridge
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName').value.trim();
      const email = document.getElementById('cEmail').value.trim();
      const subject = document.getElementById('cSubject').value.trim() || 'Inquiry / Connect';
      const message = document.getElementById('cMessage').value.trim();

      const mailSubject = encodeURIComponent(`[Portfolio] ${subject} — ${name}`);
      const body = encodeURIComponent(
        `Hi Nikita,\n\n${message}\n\nSender Email: ${email}\nSender Name: ${name}`
      );

      showToast('Opening your email client...');
      window.location.href = `mailto:nikitadhakar19@gmail.com?subject=${mailSubject}&body=${body}`;
    });
  }

});
