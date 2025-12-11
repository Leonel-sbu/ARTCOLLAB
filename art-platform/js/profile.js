// profile.js - Profile Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile page loaded');
    
    // Cart count from localStorage
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('artCart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }
    
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current tab
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Edit Profile Modal
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .cancel-btn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            editProfileModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Upload Modal
    const uploadBtns = document.querySelectorAll('.btn-primary:has(.fa-upload)');
    const uploadModal = document.getElementById('upload-modal');
    
    uploadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            uploadModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            editProfileModal.style.display = 'none';
            uploadModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Avatar Upload
    const avatarUploadBtn = document.getElementById('upload-avatar-btn');
    const avatarUploadInput = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('profile-avatar');
    const editAvatarBtn = document.getElementById('edit-avatar');
    
    if (avatarUploadBtn) {
        avatarUploadBtn.addEventListener('click', function() {
            avatarUploadInput.click();
        });
    }
    
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function() {
            avatarUploadInput.click();
        });
    }
    
    if (avatarUploadInput) {
        avatarUploadInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    avatarPreview.src = event.target.result;
                    // Update preview in modal too
                    const modalPreview = document.querySelector('#avatar-preview img');
                    if (modalPreview) {
                        modalPreview.src = event.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // File Upload with Preview
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const uploadPreview = document.getElementById('upload-preview');
    
    if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropArea.style.borderColor = '#6a11cb';
            dropArea.style.background = '#f8f9fa';
        }
        
        function unhighlight() {
            dropArea.style.borderColor = '#ddd';
            dropArea.style.background = 'white';
        }
        
        dropArea.addEventListener('drop', handleDrop, false);
        dropArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        if (browseBtn) {
            browseBtn.addEventListener('click', function() {
                fileInput.click();
            });
        }
        
        fileInput.addEventListener('change', handleFiles);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles({ target: { files } });
        }
        
        function handleFiles(e) {
            const files = e.target.files;
            if (files.length > 0) {
                uploadPreview.style.display = 'block';
                uploadPreview.innerHTML = '';
                
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'preview-item';
                        previewItem.innerHTML = `
                            <img src="${event.target.result}" alt="Preview">
                            <span>${file.name}</span>
                            <button type="button" class="remove-preview">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        uploadPreview.appendChild(previewItem);
                        
                        // Add remove functionality
                        previewItem.querySelector('.remove-preview').addEventListener('click', function() {
                            previewItem.remove();
                            if (uploadPreview.children.length === 0) {
                                uploadPreview.style.display = 'none';
                            }
                        });
                    };
                    
                    reader.readAsDataURL(file);
                }
            }
        }
    }
    
    // Form Submissions
    const editProfileForm = document.querySelector('.edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile updated successfully!');
            editProfileModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    const uploadForm = document.querySelector('.upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Artwork uploaded successfully!');
            uploadModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Reset form
            uploadForm.reset();
            uploadPreview.style.display = 'none';
            uploadPreview.innerHTML = '';
        });
    }
    
    // Remove favorite items
    const removeFavoriteBtns = document.querySelectorAll('.remove-favorite');
    removeFavoriteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const favoriteItem = this.closest('.favorite-item');
            if (confirm('Remove from favorites?')) {
                favoriteItem.style.opacity = '0';
                favoriteItem.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    favoriteItem.remove();
                }, 300);
            }
        });
    });
    
    // Artwork actions
    const artworkActionBtns = document.querySelectorAll('.artwork-action');
    artworkActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').className;
            const artworkCard = this.closest('.artwork-card');
            const artworkTitle = artworkCard.querySelector('h3').textContent;
            
            if (action.includes('fa-trash')) {
                if (confirm(`Delete "${artworkTitle}"? This action cannot be undone.`)) {
                    artworkCard.style.opacity = '0';
                    artworkCard.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        artworkCard.remove();
                    }, 300);
                }
            } else if (action.includes('fa-edit')) {
                alert(`Edit "${artworkTitle}" - This would open the edit form in a real app.`);
            } else if (action.includes('fa-share')) {
                alert(`Share "${artworkTitle}" - Share options would appear here.`);
            }
        });
    });
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn:not(:has(.fa-sort-amount-down))');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            const artworkCards = document.querySelectorAll('.artwork-card:not(.add-new)');
            
            artworkCards.forEach(card => {
                // In a real app, you would filter based on actual categories
                // For demo, we'll just show all
                card.style.display = 'block';
            });
        });
    });
    
    // Initialize cart count
    updateCartCount();
    
    console.log('Profile page initialized successfully!');
});