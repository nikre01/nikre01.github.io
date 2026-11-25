/**
 * Nikita Dhakar — Java Full-Stack Portfolio
 * Advanced Interactive Engine: Live Bitmoji, Architecture Console, & Live Project Sandboxes
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Toast Notification Hub
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
  // 2. Advanced Architecture & Concurrency Simulation (Section 3)
  // ==========================================================================
  const runPipelineDemoBtn = document.getElementById('runPipelineDemoBtn');
  const runBtnLabel = document.getElementById('runBtnLabel');
  const pipelineLogText = document.getElementById('pipelineLogText');
  const scenarioTabs = document.querySelectorAll('.scenario-tab');

  const node1 = document.getElementById('node1');
  const node2 = document.getElementById('node2');
  const node3 = document.getElementById('node3');
  const node4 = document.getElementById('node4');

  const nodeBadge1 = document.getElementById('nodeBadge1');
  const nodeTitle1 = document.getElementById('nodeTitle1');
  const nodeDetail1 = document.getElementById('nodeDetail1');

  const nodeBadge2 = document.getElementById('nodeBadge2');
  const nodeTitle2 = document.getElementById('nodeTitle2');
  const nodeDetail2 = document.getElementById('nodeDetail2');

  const nodeBadge3 = document.getElementById('nodeBadge3');
  const nodeTitle3 = document.getElementById('nodeTitle3');
  const nodeDetail3 = document.getElementById('nodeDetail3');

  const nodeBadge4 = document.getElementById('nodeBadge4');
  const nodeTitle4 = document.getElementById('nodeTitle4');
  const nodeDetail4 = document.getElementById('nodeDetail4');

  let activeScenario = 'success';

  // Scenario Switcher
  scenarioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      scenarioTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeScenario = tab.getAttribute('data-scenario');
      configureScenarioView(activeScenario);
    });
  });

  function configureScenarioView(scenario) {
    resetPipelineNodes();
    if (scenario === 'success') {
      if (nodeDetail1) nodeDetail1.textContent = '₹1,200.00 • rahul@oksbi';
      if (nodeTitle3) nodeTitle3.textContent = 'Atomic Mutation';
      if (nodeDetail3) nodeDetail3.textContent = 'Debit ₹1.2k / Credit ₹1.2k';
      if (nodeBadge4) nodeBadge4.textContent = 'LEDGER AUDIT';
      if (nodeTitle4) nodeTitle4.textContent = 'SHA-256 Receipt';
      if (nodeDetail4) nodeDetail4.textContent = 'Status: SETTLED (200 OK)';
      if (pipelineLogText) pipelineLogText.textContent = 'Configured: Happy Path Instant Settlement (₹1,200). Click execute to run.';
    } else if (scenario === 'rollback') {
      if (nodeDetail1) nodeDetail1.textContent = '₹85,000.00 • user@oksbi';
      if (nodeTitle3) nodeTitle3.textContent = 'Validation Breach';
      if (nodeDetail3) nodeDetail3.textContent = 'Insufficient Funds Exception';
      if (nodeBadge4) nodeBadge4.textContent = 'ACID ROLLBACK';
      if (nodeTitle4) nodeTitle4.textContent = 'Transaction Revert';
      if (nodeDetail4) nodeDetail4.textContent = 'Status: ROLLED_BACK (402)';
      if (pipelineLogText) pipelineLogText.textContent = 'Configured: Insufficient Funds Scenario (₹85,000 > available ₹4,500). Click execute to see ACID rollback.';
    } else if (scenario === 'concurrency') {
      if (nodeDetail1) nodeDetail1.textContent = '2 Concurrent Threads';
      if (nodeTitle3) nodeTitle3.textContent = 'Pessimistic Lock Queuing';
      if (nodeDetail3) nodeDetail3.textContent = 'Thread-2 awaits Thread-1';
      if (nodeBadge4) nodeBadge4.textContent = 'ZERO DOUBLE-SPEND';
      if (nodeTitle4) nodeTitle4.textContent = 'Serialized Commit';
      if (nodeDetail4) nodeDetail4.textContent = 'Both threads settled safely';
      if (pipelineLogText) pipelineLogText.textContent = 'Configured: High Concurrency Race Condition. Click execute to see synchronized row locking.';
    }
  }

  function resetPipelineNodes() {
    [node1, node2, node3, node4].forEach(n => {
      if (n) {
        n.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        n.style.background = '#181d2a';
      }
    });
  }

  if (runPipelineDemoBtn) {
    runPipelineDemoBtn.addEventListener('click', () => {
      runPipelineDemoBtn.disabled = true;
      runPipelineDemoBtn.style.opacity = '0.6';
      resetPipelineNodes();

      if (activeScenario === 'success') {
        runSuccessScenario();
      } else if (activeScenario === 'rollback') {
        runRollbackScenario();
      } else if (activeScenario === 'concurrency') {
        runConcurrencyScenario();
      }
    });
  }

  function runSuccessScenario() {
    pipelineLogText.textContent = '[T+0ms] Ingress: HTTP 200 POST /api/v1/upi/pay • Payload: { sender: "rahul@oksbi", amount: 1200.00 }';
    if (node1) {
      node1.style.borderColor = '#ff5722';
      node1.style.background = 'rgba(255, 87, 34, 0.14)';
    }

    setTimeout(() => {
      pipelineLogText.textContent = '[T+6ms] Concurrency Control: Acquired HikariCP connection #3. SELECT balance FROM accounts WHERE vpa = ? FOR UPDATE;';
      if (node2) {
        node2.style.borderColor = '#ff5722';
        node2.style.background = 'rgba(255, 87, 34, 0.14)';
      }
    }, 600);

    setTimeout(() => {
      pipelineLogText.textContent = '[T+12ms] ACID Execution: Parameterized UPDATE accounts SET balance = balance - 1200.00; Balance checks OK.';
      if (node3) {
        node3.style.borderColor = '#ff5722';
        node3.style.background = 'rgba(255, 87, 34, 0.14)';
      }
    }, 1300);

    setTimeout(() => {
      const hash = 'TXN-SETTLED-' + Math.floor(100000 + Math.random() * 900000);
      pipelineLogText.textContent = `[T+18ms] Complete: DB Connection closed. Audit receipt hash [${hash}]. Status: SETTLED (Latency: 18.2ms).`;
      if (node4) {
        node4.style.borderColor = '#10b981';
        node4.style.background = 'rgba(16, 185, 129, 0.16)';
      }
      showToast(`Settled: ${hash}`);
      runPipelineDemoBtn.disabled = false;
      runPipelineDemoBtn.style.opacity = '1';
    }, 2000);
  }

  function runRollbackScenario() {
    pipelineLogText.textContent = '[T+0ms] Ingress: HTTP 200 POST /api/v1/upi/pay • Transfer amount: ₹85,000.00';
    if (node1) {
      node1.style.borderColor = '#ff5722';
      node1.style.background = 'rgba(255, 87, 34, 0.14)';
    }

    setTimeout(() => {
      pipelineLogText.textContent = '[T+5ms] Lock: Row locked. Querying ledger balance for user@oksbi... Found: ₹4,500.00';
      if (node2) {
        node2.style.borderColor = '#ff5722';
        node2.style.background = 'rgba(255, 87, 34, 0.14)';
      }
    }, 600);

    setTimeout(() => {
      pipelineLogText.textContent = '[T+11ms] EXCEPTION: InsufficientFundsException (Required: ₹85,000.00 | Available: ₹4,500.00). Initiating transaction ROLLBACK.';
      if (node3) {
        node3.style.borderColor = '#ef4444';
        node3.style.background = 'rgba(239, 68, 68, 0.16)';
      }
    }, 1300);

    setTimeout(() => {
      pipelineLogText.textContent = '[T+17ms] ROLLBACK COMPLETE: Connection.rollback() called. 0 rows mutated. Status: REJECTED (Zero double-spends).';
      if (node4) {
        node4.style.borderColor = '#f59e0b';
        node4.style.background = 'rgba(245, 158, 11, 0.16)';
      }
      showToast('ACID Rollback Executed: Funds Protected');
      runPipelineDemoBtn.disabled = false;
      runPipelineDemoBtn.style.opacity = '1';
    }, 2000);
  }

  function runConcurrencyScenario() {
    pipelineLogText.textContent = '[T+0ms] Concurrency Ingress: Thread-1 and Thread-2 invoke debit simultaneously on account [pune.merchant@axis]';
    if (node1) {
      node1.style.borderColor = '#3b82f6';
      node1.style.background = 'rgba(59, 130, 246, 0.14)';
    }

    setTimeout(() => {
      pipelineLogText.textContent = '[T+6ms] Lock Gate: Thread-1 secures SELECT FOR UPDATE lock. Thread-2 queued in pool waiting for lock release...';
      if (node2) {
        node2.style.borderColor = '#3b82f6';
        node2.style.background = 'rgba(59, 130, 246, 0.14)';
      }
    }, 600);

    setTimeout(() => {
      pipelineLogText.textContent = '[T+14ms] Sequential Execution: Thread-1 commits successfully. Lock transferred to Thread-2. Thread-2 executes safely.';
      if (node3) {
        node3.style.borderColor = '#3b82f6';
        node3.style.background = 'rgba(59, 130, 246, 0.14)';
      }
    }, 1300);

    setTimeout(() => {
      pipelineLogText.textContent = '[T+22ms] Race Condition Solved: Both transactions sequenced with strict ACID isolation. 0 discrepancy.';
      if (node4) {
        node4.style.borderColor = '#10b981';
        node4.style.background = 'rgba(16, 185, 129, 0.16)';
      }
      showToast('Concurrency Protected: 0 Race Condition');
      runPipelineDemoBtn.disabled = false;
      runPipelineDemoBtn.style.opacity = '1';
    }, 2000);
  }

  // ==========================================================================
  // 4. Modal Helpers & Modal Handlers
  // ==========================================================================
  const setupModal = (openBtnId, modalId, closeBtnId) => {
    const openBtn = document.getElementById(openBtnId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    }
  };

  // Setup 3 Interactive Project Modals
  setupModal('btnLiveUpi', 'upiModal', 'closeUpiModal');
  setupModal('btnLiveTraffic', 'trafficModal', 'closeTrafficModal');
  setupModal('btnLivePlush', 'plushModal', 'closePlushModal');

  // Escape key closes open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.interactive-modal-backdrop').forEach(m => {
        m.classList.add('hidden');
      });
      document.body.style.overflow = '';
    }
  });

  // ==========================================================================
  // 5. Live Project 1: UPI Simulator Logic
  // ==========================================================================
  const upiSimulatorForm = document.getElementById('upiSimulatorForm');
  const upiSimLogText = document.getElementById('upiSimLogText');
  const upiReceiptCard = document.getElementById('upiReceiptCard');
  const btnSubmitUpiSim = document.getElementById('btnSubmitUpiSim');

  if (upiSimulatorForm && upiSimLogText) {
    upiSimulatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sender = document.getElementById('simSenderVpa').value.trim();
      const receiver = document.getElementById('simReceiverVpa').value.trim();
      const amount = parseFloat(document.getElementById('simAmount').value.trim()) || 1200;
      const bank = document.getElementById('simBank').value;

      btnSubmitUpiSim.disabled = true;
      btnSubmitUpiSim.style.opacity = '0.6';
      if (upiReceiptCard) upiReceiptCard.classList.add('hidden');

      upiSimLogText.textContent = `[JVM Thread-1] Starting transaction:\n> Sender: ${sender}\n> Receiver: ${receiver}\n> Amount: ₹${amount.toFixed(2)}\n> Gateway: ${bank} CBS Bridge`;

      setTimeout(() => {
        upiSimLogText.textContent += `\n[T+4ms] Validating UPI address syntax & SHA-256 HMAC checksum... OK`;
      }, 400);

      setTimeout(() => {
        upiSimLogText.textContent += `\n[T+9ms] HikariCP: Connection leased. Executing SELECT balance FROM accounts WHERE vpa='${sender}' FOR UPDATE;`;
      }, 800);

      setTimeout(() => {
        upiSimLogText.textContent += `\n[T+14ms] Executing Atomic JDBC updates:\n  - UPDATE accounts SET balance = balance - ${amount} WHERE vpa='${sender}';\n  - UPDATE accounts SET balance = balance + ${amount} WHERE vpa='${receiver}';`;
      }, 1200);

      setTimeout(() => {
        const txnId = 'TXN-UPI-' + Math.floor(100000 + Math.random() * 900000);
        upiSimLogText.textContent += `\n[T+19ms] Commit successful! Generated Reference ID: [${txnId}]\nStatus: 200 OK SETTLED.`;

        if (upiReceiptCard) {
          document.getElementById('receiptAmount').textContent = `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
          document.getElementById('receiptTxnId').textContent = txnId;
          document.getElementById('receiptSender').textContent = sender;
          document.getElementById('receiptReceiver').textContent = receiver;
          upiReceiptCard.classList.remove('hidden');
        }

        showToast(`UPI Transfer Succeeded: ${txnId}`);
        btnSubmitUpiSim.disabled = false;
        btnSubmitUpiSim.style.opacity = '1';
      }, 1700);
    });
  }

  // ==========================================================================
  // 6. Live Project 2: AI Smart Traffic Engine Logic
  // ==========================================================================
  const densitySlider = document.getElementById('densitySlider');
  const densityValDisplay = document.getElementById('densityValDisplay');
  const btnCalculateTraffic = document.getElementById('btnCalculateTraffic');

  const lightRed = document.getElementById('lightRed');
  const lightYellow = document.getElementById('lightYellow');
  const lightGreen = document.getElementById('lightGreen');

  const congestionScoreDisplay = document.getElementById('congestionScoreDisplay');
  const signalTimingDisplay = document.getElementById('signalTimingDisplay');
  const trafficAdvisoryDisplay = document.getElementById('trafficAdvisoryDisplay');

  if (densitySlider && densityValDisplay) {
    densitySlider.addEventListener('input', () => {
      densityValDisplay.textContent = `${densitySlider.value} vehicles / min`;
    });
  }

  if (btnCalculateTraffic) {
    btnCalculateTraffic.addEventListener('click', () => {
      const density = parseInt(densitySlider.value, 10);
      const timeSlot = document.getElementById('trafficTimeSelect').value;
      const weather = document.getElementById('trafficWeatherSelect').value;

      let timeFactor = 1.0;
      if (timeSlot === 'morning' || timeSlot === 'evening') timeFactor = 1.35;
      else if (timeSlot === 'night') timeFactor = 0.55;

      let weatherFactor = 1.0;
      if (weather === 'rain') weatherFactor = 1.45;
      else if (weather === 'fog') weatherFactor = 1.30;

      // Rule Engine weighted calculation
      const baseScore = (density / 300) * 100;
      const finalScore = Math.min(99, Math.round(baseScore * timeFactor * weatherFactor));

      // Reset lights
      [lightRed, lightYellow, lightGreen].forEach(l => l && l.classList.remove('active'));

      if (finalScore >= 70) {
        if (lightRed) lightRed.classList.add('active');
        congestionScoreDisplay.textContent = `${finalScore}% (CRITICAL CONGESTION)`;
        congestionScoreDisplay.className = 'metric-highlight text-coral';
        signalTimingDisplay.textContent = 'Green Light: 85 Seconds (Maximum Clearing Phase)';
        trafficAdvisoryDisplay.textContent = 'Automatic Advisory: Divert eastbound traffic to Outer Bypass.';
      } else if (finalScore >= 40) {
        if (lightYellow) lightYellow.classList.add('active');
        congestionScoreDisplay.textContent = `${finalScore}% (MODERATE FLOW)`;
        congestionScoreDisplay.className = 'metric-highlight text-amber';
        signalTimingDisplay.textContent = 'Green Light: 55 Seconds (Adaptive Cycle)';
        trafficAdvisoryDisplay.textContent = 'Normal flow with light queuing. Maintaining standard signal sequence.';
      } else {
        if (lightGreen) lightGreen.classList.add('active');
        congestionScoreDisplay.textContent = `${finalScore}% (FREE FLOWING)`;
        congestionScoreDisplay.className = 'metric-highlight text-green';
        signalTimingDisplay.textContent = 'Green Light: 30 Seconds (Energy Saving Cycle)';
        trafficAdvisoryDisplay.textContent = 'Zero bottleneck detected. Traffic moving smoothly.';
      }

      showToast(`Rule Engine: Congestion ${finalScore}%`);
    });
  }

  // ==========================================================================
  // 7. Live Project 4: Plush Crafts Studio Store Preview
  // ==========================================================================
  const plushQty = document.getElementById('plushQty');
  const plushTotalDisplay = document.getElementById('plushTotalDisplay');
  const btnPlushWhatsApp = document.getElementById('btnPlushWhatsApp');
  const plushUnitPrice = 849.0;

  if (plushQty && plushTotalDisplay) {
    plushQty.addEventListener('input', () => {
      const qty = Math.max(1, parseInt(plushQty.value, 10) || 1);
      const total = qty * plushUnitPrice;
      plushTotalDisplay.textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    });
  }

  if (btnPlushWhatsApp) {
    btnPlushWhatsApp.addEventListener('click', () => {
      const color = document.getElementById('plushColor').value;
      const qty = Math.max(1, parseInt(plushQty.value, 10) || 1);
      const total = qty * plushUnitPrice;
      const message = `Hi Plush Crafts Studio, I would like to order:\n- 🧸 Handmade Velvet Amigurumi Bunny\n- Color: ${color}\n- Quantity: ${qty}\n- Total: ₹${total.toFixed(2)}`;
      
      showToast('Generated WhatsApp Payload!');
      alert(`[Simulated WhatsApp Payload for Order]:\n\n${message}`);
    });
  }

  // ==========================================================================
  // 8. Copy Email to Clipboard
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
  // 9. Mobile Navigation Drawer
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
  // 10. Direct Contact Form Mailto Bridge
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
