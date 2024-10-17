// Цены за каждый тип услуги
const servicePrices = {
    type1: 47,
    type2: 159,
    type3: 25
};

// Дополнительные опции и их влияния на цену для услуги 2
const optionPrices = {
    opt1: 0,
    opt2: 50
};

// Доплата за свойство для услуги 3
const propertyPrice = 15;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calc-form');
    const quantityInput = document.getElementById('quantity');
    const serviceTypeInputs = document.querySelectorAll('input[name="serviceType"]');
    const optionsContainer = document.getElementById('options-container');
    const optionsSelect = document.getElementById('options');
    const propertyContainer = document.getElementById('property-container');
    const propertyCheckbox = document.getElementById('property');
    const totalPriceElement = document.getElementById('total-price');

    // Функция пересчета цены
    function calculatePrice() {
        const quantity = parseInt(quantityInput.value, 10);
        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;
        let basePrice = servicePrices[selectedServiceType];
        
        // Если выбрана услуга 2, учитываем опцию
        if (selectedServiceType === 'type2') {
            const selectedOption = optionsSelect.value;
            basePrice += optionPrices[selectedOption];
        }
        
        // Если выбрана услуга 3, учитываем свойство
        if (selectedServiceType === 'type3' && propertyCheckbox.checked) {
            basePrice += propertyPrice;
        }

        // Рассчитываем общую стоимость
        const totalPrice = basePrice * quantity;
        if(isNaN(totalPrice)){
            totalPriceElement.textContent = '0';
        }
        else if(totalPrice<0){
            totalPriceElement.textContent = `ВЫ НЕ МОЖЕТЕ КУПИТЬ ОТРИЦАТЕЛЬНОЕ ЧИСЛО ЧЕГО ЛИБО`;
        }
        else{
            totalPriceElement.textContent = totalPrice;
        }
    }

    // Функция для управления отображением опций/свойств в зависимости от типа услуги
    function handleServiceTypeChange() {
        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;

        // Для Услуги 1: скрыть оба контейнера
        if (selectedServiceType === 'type1') {
            optionsContainer.classList.add('hidden');
            propertyContainer.classList.add('hidden');
        }

        // Для Услуги 2: показать селект с опциями, скрыть чекбокс
        if (selectedServiceType === 'type2') {
            optionsContainer.classList.remove('hidden');
            propertyContainer.classList.add('hidden');
        }

        // Для Услуги 3: показать чекбокс для свойства, скрыть селект
        if (selectedServiceType === 'type3') {
            optionsContainer.classList.add('hidden');
            propertyContainer.classList.remove('hidden');
        }

        calculatePrice();
    }

    // Обработчики для смены типа услуги
    serviceTypeInputs.forEach(input => {
        input.addEventListener('change', handleServiceTypeChange);
    });

    // Обработчик для изменения количества
    quantityInput.addEventListener('input', calculatePrice);

    // Обработчик для изменения опции
    optionsSelect.addEventListener('change', calculatePrice);

    // Обработчик для изменения свойства
    propertyCheckbox.addEventListener('change', calculatePrice);

    // Начальный расчет и установка правильного отображения при загрузке
    handleServiceTypeChange();
});
