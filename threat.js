document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js with different config for threat page
    particlesJS('particles-threat', {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ff3860"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 4,
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ff3860",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const timeButtons = document.querySelectorAll('.time-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Here you would typically load different content for each tab
        });
    });
    
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            timeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Here you would typically filter data based on time period
        });
    });

    // Table row click functionality
    const tableRows = document.querySelectorAll('.threats-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', (e) => {
            if (!e.target.classList.contains('action-btn')) {
                // Here you would typically open a detailed view of the threat
                console.log('Viewing threat:', row.cells[0].textContent);
            }
        });
    });

    // Action buttons in table
    document.querySelectorAll('.action-btn.resolve').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            row.classList.remove('critical', 'warning', 'notice');
            row.classList.add('resolved');
            row.querySelector('.status-badge').textContent = 'Resolved';
            row.querySelector('.status-badge').className = 'status-badge resolved';
            // Here you would typically send a request to mark threat as resolved
        });
    });
    
    document.querySelectorAll('.action-btn.reopen').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            row.classList.remove('resolved');
            row.classList.add('warning');
            row.querySelector('.status-badge').textContent = 'Investigating';
            row.querySelector('.status-badge').className = 'status-badge investigating';
            // Here you would typically reopen the threat
        });
    });

    // Export button functionality
    document.querySelector('.export-btn').addEventListener('click', () => {
        // Here you would typically export the threat data
        console.log('Exporting threat data...');
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const userMenu = document.querySelector('.user-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        userMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Simulate real-time threat updates
    function simulateThreatUpdate() {
        const criticalCount = document.querySelector('.summary-card.critical .count');
        const warningCount = document.querySelector('.summary-card.warning .count');
        const noticeCount = document.querySelector('.summary-card.notice .count');
        const resolvedCount = document.querySelector('.summary-card.resolved .count');
        
        // Randomly increment counts to simulate real-time updates
        if (Math.random() > 0.7) {
            const current = parseInt(criticalCount.textContent);
            criticalCount.textContent = current + 1;
            document.querySelector('.summary-card.critical .trend').innerHTML = '<i class="fas fa-arrow-up"></i> Just now';
            
            // Add a new row to the table
            const tableBody = document.querySelector('.threats-table tbody');
            const newRow = document.createElement('tr');
            newRow.className = 'critical';
            newRow.innerHTML = `
                <td>TH-2023-${Math.floor(1000 + Math.random() * 9000)}</td>
                <td>New Threat</td>
                <td><span class="severity-badge critical">Critical</span></td>
                <td>Node ${Math.floor(Math.random() * 20)}${String.fromCharCode(65 + Math.floor(Math.random() * 5))}</td>
                <td>${new Date().toLocaleTimeString()}</td>
                <td><span class="status-badge active">Active</span></td>
                <td>
                    <button class="action-btn view"><i class="fas fa-eye"></i></button>
                    <button class="action-btn resolve"><i class="fas fa-check"></i></button>
                </td>
            `;
            tableBody.insertBefore(newRow, tableBody.firstChild);
            
            // Remove last row if there are too many
            if (tableBody.children.length > 10) {
                tableBody.removeChild(tableBody.lastChild);
            }
        }
    }
    
    // Update every 5-15 seconds randomly
    setInterval(simulateThreatUpdate, 5000 + Math.random() * 10000);
});