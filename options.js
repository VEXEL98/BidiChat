// BidiChat Options page script

const fontSelect = document.getElementById('fontSelect');
const customFontGroup = document.getElementById('customFontGroup');
const customFont = document.getElementById('customFont');
const fontSize = document.getElementById('fontSize');
const saveBtn = document.getElementById('save');
const status = document.getElementById('status');

// Load saved settings
chrome.storage.sync.get(['rtlFont', 'rtlFontSize'], (data) => {
  const savedFont = data.rtlFont || 'Vazirmatn';
  const savedSize = data.rtlFontSize || 16;

  // Determine if it's a known font or custom
  const optionExists = [...fontSelect.options].some(opt => opt.value === savedFont && opt.value !== 'custom');
  if (optionExists) {
    fontSelect.value = savedFont;
    customFontGroup.style.display = 'none';
  } else {
    fontSelect.value = 'custom';
    customFontGroup.style.display = 'block';
    customFont.value = savedFont;
  }
  fontSize.value = savedSize;
});

// Toggle custom font input
fontSelect.addEventListener('change', () => {
  customFontGroup.style.display = fontSelect.value === 'custom' ? 'block' : 'none';
});

// Save settings
saveBtn.addEventListener('click', () => {
  const selectedFont = fontSelect.value === 'custom' ? customFont.value.trim() : fontSelect.value;
  const selectedSize = parseInt(fontSize.value, 10);

  if (!selectedFont) {
    status.textContent = 'نام فونت نمی‌تواند خالی باشد.';
    status.style.color = 'red';
    return;
  }
  if (isNaN(selectedSize) || selectedSize < 10 || selectedSize > 40) {
    status.textContent = 'سایز باید عددی بین ۱۰ تا ۴۰ باشد.';
    status.style.color = 'red';
    return;
  }

  chrome.storage.sync.set({
    rtlFont: selectedFont,
    rtlFontSize: selectedSize
  }, () => {
    status.textContent = 'تنظیمات با موفقیت ذخیره شد.';
    status.style.color = 'green';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
});