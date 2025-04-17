document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Time filter buttons
    const timeButtons = document.querySelectorAll('.time-btn');
    
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            timeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you would filter data based on the selected time period
            console.log(`Time period selected: ${this.textContent}`);
        });
    });

    // Visualization type buttons
    const vizButtons = document.querySelectorAll('.viz-btn');
    
    vizButtons.forEach(button => {
        button.addEventListener('click', function() {
            vizButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you would change the chart type
            console.log(`Visualization type selected: ${this.textContent}`);
        });
    });

    // Refresh button
    const refreshBtn = document.querySelector('.refresh-btn');
    
    refreshBtn.addEventListener('click', function() {
        this.disabled = true;
        const icon = this.querySelector('i');
        icon.classList.add('fa-spin');
        
        // Simulate data refresh
        setTimeout(() => {
            this.disabled = false;
            icon.classList.remove('fa-spin');
            alert('Data refreshed successfully');
        }, 1500);
    });

    // Export button
    const exportBtn = document.querySelector('.export-btn');
    
    exportBtn.addEventListener('click', function() {
        // In a real app, you would trigger data export
        alert('Exporting data...');
    });

    // Card menu buttons
    const cardMenus = document.querySelectorAll('.card-menu');
    
    cardMenus.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // In a real app, you would show a context menu
            console.log('Card menu clicked');
        });
    });

    // Simulate real-time data updates
    function simulateDataUpdate() {
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach(stat => {
            const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 100) - 50; // Random change between -50 and 50
            
            // Only update if the change would keep the value positive
            if (currentValue + change > 0) {
                const newValue = currentValue + change;
                stat.textContent = newValue.toLocaleString() + ' ' + stat.querySelector('span').textContent;
                
                // Update the change indicator
                const changeElement = stat.nextElementSibling;
                if (change > 0) {
                    changeElement.innerHTML = '<i class="fas fa-arrow-up"></i> ' + Math.abs(change) + '% from previous';
                    changeElement.className = 'stat-change up';
                } else if (change < 0) {
                    changeElement.innerHTML = '<i class="fas fa-arrow-down"></i> ' + Math.abs(change) + '% from previous';
                    changeElement.className = 'stat-change down';
                } else {
                    changeElement.innerHTML = 'No change';
                    changeElement.className = 'stat-change';
                }
            }
        });
    }
    
    // Update data every 10 seconds
    setInterval(simulateDataUpdate, 10000);

    // User dropdown
    const userMenu = document.querySelector('.user-menu');
    
    userMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        this.querySelector('.dropdown-content').classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    });
});