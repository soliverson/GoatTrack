document.addEventListener('DOMContentLoaded', function() {
  const typeSelect = document.getElementById('typeSelect');
  const stateSelectContainer = document.getElementById('stateSelectContainer');
  const stateSelect = document.getElementById('stateSelect');
  const loading = document.getElementById('loading');
  const errorDiv = document.getElementById('error');
  const dataContainer = document.getElementById('dataContainer');
  const dataTitle = document.getElementById('dataTitle');
  const dataBody = document.getElementById('dataBody');
  const typeHeader1 = document.getElementById('typeHeader1');
  const typeHeader2 = document.getElementById('typeHeader2');

  let data = [];
  let states = [];

  async function fetchData() {
      loading.style.display = 'block';
      errorDiv.style.display = 'none';
      dataContainer.style.display = 'none';
      try {
          const response = await fetch(`https://gisportal.ers.usda.gov/server/rest/services/Census_of_Agriculture_Data/Livestock_and_Animals_2017/MapServer/9/query?f=json&where=1=1&outFields=STATE_NAME,Name,y17_M119_valueText,y17_M119_classRange,y17_M120_valueText,y17_M120_classRange,y17_M121_valueText,y17_M121_classRange&returnGeometry=false`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const json = await response.json();
          data = json.features.map(feature => ({
              state: feature.attributes.STATE_NAME,
              county: feature.attributes.Name,
              allGoats: feature.attributes.y17_M119_valueText,
              allGoatsRange: feature.attributes.y17_M119_classRange,
              milkGoats: feature.attributes.y17_M120_valueText,
              milkGoatsRange: feature.attributes.y17_M120_classRange,
              meatGoats: feature.attributes.y17_M121_valueText,
              meatGoatsRange: feature.attributes.y17_M121_classRange,
          }));

          console.log('Fetched data:', data); // Log the fetched data for debugging

          states = [...new Set(data.map(item => item.state))];
          stateSelect.innerHTML = '<option value="">Select State</option>';
          states.forEach(state => {
              const option = document.createElement('option');
              option.value = state;
              option.textContent = state;
              stateSelect.appendChild(option);
          });

          loading.style.display = 'none';
      } catch (error) {
          loading.style.display = 'none';
          errorDiv.style.display = 'block';
          errorDiv.textContent = 'Error fetching data';
          console.error('API Error:', error);
      }
  }

  typeSelect.addEventListener('change', function() {
      const selectedType = typeSelect.value;
      stateSelectContainer.style.display = selectedType ? 'block' : 'none';
      stateSelect.value = '';
      dataBody.innerHTML = '';
      dataContainer.style.display = 'none';
  });

  stateSelect.addEventListener('change', function() {
      const selectedType = typeSelect.value;
      const selectedState = stateSelect.value;
      const filteredData = data.filter(item => item.state === selectedState && (selectedType === 'all' || (selectedType === 'dairy' && item.milkGoats) || (selectedType === 'meat' && item.meatGoats)));

      if (selectedType === 'all') {
          typeHeader1.textContent = 'All Goats';
          typeHeader2.textContent = 'Range';
      } else if (selectedType === 'dairy') {
          typeHeader1.textContent = 'Milk Goats';
          typeHeader2.textContent = 'Range';
      } else if (selectedType === 'meat') {
          typeHeader1.textContent = 'Meat Goats';
          typeHeader2.textContent = 'Range';
      }

      console.log('Filtered data:', filteredData); // Log the filtered data for debugging

      dataBody.innerHTML = filteredData.map(item => `
          <tr>
              <td>${item.state}</td>
              <td>${item.county}</td>
              <td>${selectedType === 'all' ? item.allGoats : selectedType === 'dairy' ? item.milkGoats : item.meatGoats}</td>
              <td>${selectedType === 'all' ? item.allGoatsRange : selectedType === 'dairy' ? item.milkGoatsRange : item.meatGoatsRange}</td>
          </tr>
      `).join('');

      dataTitle.textContent = `Data for ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Goats in ${selectedState}`;
      dataContainer.style.display = 'block';
  });

  fetchData();
});
