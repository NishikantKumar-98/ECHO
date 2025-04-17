document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initThreatTimelineChart();
    
    // Initialize threat map (simulated)
    initThreatMap();
    
    // Table row click functionality
    document.querySelectorAll('.events-table tbody tr').forEach(row => {
        row.addEventListener('click', function(e) {
            if (!e.target.classList.contains('table-btn')) {
                this.classList.toggle('expanded');
            }
        });
    });
    
    // Simulate real-time threat updates
    simulateThreatUpdates();
});

function initThreatTimelineChart() {
    const ctx = document.getElementById('threatTimelineChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(24).fill().map((_, i) => `${i}:00`),
            datasets: [{
                label: 'Critical Threats',
                data: generateRandomData(24, 0, 10),
                borderColor: '#f72585',
                backgroundColor: 'rgba(247, 37, 133, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: 'High Threats',
                data: generateRandomData(24, 0, 15),
                borderColor: '#f77f00',
                backgroundColor: 'rgba(247, 127, 0, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: 'Medium Threats',
                data: generateRandomData(24, 0, 20),
                borderColor: '#4895ef',
                backgroundColor: 'rgba(72, 149, 239, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Threats'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function initThreatMap() {
    // In a real implementation, this would initialize a proper map visualization
    // For this example, we'll just simulate some threat indicators
    const threatMap = document.getElementById('threatMap');
    
    // Clear any existing content
    threatMap.innerHTML = '';
    
    // Create a container for our simulated threats
    const mapContainer = document.createElement('div');
    mapContainer.className = 'simulated-map';
    mapContainer.style.width = '100%';
    mapContainer.style.height = '100%';
    mapContainer.style.position = 'relative';
    mapContainer.style.background = '#f8f9fa';
    
    // Add some simulated threat indicators
    const threatLocations = [
        { x: 15, y: 30, severity: 'critical' },
        { x: 70, y: 40, severity: 'high' },
        { x: 30, y: 60, severity: 'medium' },
        { x: 80, y: 20, severity: 'low' },
        { x: 50, y: 50, severity: 'critical' },
        { x: 20, y: 70, severity: 'high' },
        { x: 60, y: 60, severity: 'medium' },
    ];
    
    threatLocations.forEach(loc => {
        const threat = document.createElement('div');
        threat.className = `threat-indicator ${loc.severity}`;
        threat.style.position = 'absolute';
        threat.style.left = `${loc.x}%`;
        threat.style.top = `${loc.y}%`;
        threat.style.width = '12px';
        threat.style.height = '12px';
        threat.style.borderRadius = '50%';
        threat.style.transform = 'translate(-50%, -50%)';
        threat.style.boxShadow = '0 0 10px currentColor';
        
        if (loc.severity === 'critical') {
            threat.style.backgroundColor = 'var(--danger-color)';
            threat.style.color = 'var(--danger-color)';
        } else if (loc.severity === 'high') {
            threat.style.backgroundColor = 'var(--warning-color)';
            threat.style.color = 'var(--warning-color)';
        } else if (loc.severity === 'medium') {
            threat.style.backgroundColor = 'var(--accent-color)';
            threat.style.color = 'var(--accent-color)';
        } else {
            threat.style.backgroundColor = 'var(--success-color)';
            threat.style.color = 'var(--success-color)';
        }
        
        // Add pulsing animation
        threat.style.animation = `pulse 2s infinite ${Math.random() * 2}s`;
        
        mapContainer.appendChild(threat);
    });
    
    threatMap.appendChild(mapContainer);
    
    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            70% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function simulateThreatUpdates() {
    // Simulate new threats appearing
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Add a new row to the table (simulated)
        const tableBody = document.querySelector('.events-table tbody');
        if (tableBody) {
            const newRow = document.createElement('tr');
            newRow.className = Math.random() > 0.7 ? 'critical' : 
                              Math.random() > 0.5 ? 'high' : 
                              Math.random() > 0.3 ? 'medium' : 'low';
            
            const severities = {
                'critical': 'Critical',
                'high': 'High',
                'medium': 'Medium',
                'low': 'Low'
            };
            
            const statuses = ['Open', 'In Progress', 'Resolved'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            
            const eventTypes = [
                'Unauthorized Access',
                'Malware Detected',
                'Brute Force Attempt',
                'Port Scan',
                'Policy Violation',
                'Data Exfiltration Attempt'
            ];
            const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            
            const severity = severities[newRow.className];
            
            newRow.innerHTML = `
                <td>${timeString}</td>
                <td>${eventType}</td>
                <td><span class="severity-badge ${newRow.className}">${severity}</span></td>
                <td>${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}</td>
                <td>${['Admin Portal', 'File Server', 'VPN Gateway', 'Network Perimeter', 'User Workstation'][Math.floor(Math.random() * 5)]}</td>
                <td><span class="status-badge ${status.toLowerCase().replace(' ', '-')}">${status}</span></td>
                <td>
                    <button class="table-btn investigate">Investigate</button>
                    <button class="table-btn mute">Mute</button>
                </td>
            `;
            
            tableBody.insertBefore(newRow, tableBody.firstChild);
            
            // Limit table to 20 rows
            if (tableBody.children.length > 20) {
                tableBody.removeChild(tableBody.lastChild);
            }
            
            // Update critical threats count
            const criticalCount = document.querySelector('.status-card.critical .count');
            if (criticalCount) {
                const current = parseInt(criticalCount.textContent);
                criticalCount.textContent = newRow.className === 'critical' ? current + 1 : Math.max(0, current - 1);
            }
            
            // Flash the new row
            newRow.style.transition = 'none';
            newRow.style.backgroundColor = 'rgba(72, 149, 239, 0.3)';
            setTimeout(() => {
                newRow.style.transition = 'background-color 1s ease';
                newRow.style.backgroundColor = '';
            }, 100);
        }
    }, 5000);
}

function generateRandomData(count, min, max) {
    return Array(count).fill().map(() => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Refresh button functionality
document.querySelector('.refresh-btn')?.addEventListener('click', function() {
    this.disabled = true;
    this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Refreshing...</span>';
    
    // Simulate refresh delay
    setTimeout(() => {
        initThreatMap();
        this.innerHTML = '<i class="fa-solid fa-rotate"></i><span>Refresh</span>';
        this.disabled = false;
    }, 1500);
});