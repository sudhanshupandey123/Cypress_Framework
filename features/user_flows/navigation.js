// Cypress equivalent for navigation logic from Python
const { NavigationLink } = require('../UI_Elements/navigation_link');
const config = require('../../cypress.env.json');

const locations = [
  { position: 'Sidebar', name: 'FACILITIES', parentName: null, selector: "a[title='Facilities'] span:contains('Facilities')" },
  { position: 'Sidebar', name: 'ASSETS', parentName: null, selector: "a[title='Assets'],a:contains('Assets')" },
  { position: 'Sidebar', name: 'DOCUMENTS', parentName: 'FACILITY', selector: "a[title='Documents'],a:contains('Documents')" },
  { position: 'Sidebar', name: 'MEASUREMENTS', parentName: 'ADMIN', selector: "a[title='Measurements'],a:contains('Measurements')" },
  { position: 'Sidebar', name: 'USERS', parentName: 'ADMIN', selector: "a[title='Users'],a:contains('Users')" },
  { position: 'Sidebar', name: 'JOBS', parentName: 'ADMIN', selector: "a[title='Jobs'],a:contains('Jobs')" },
  { position: 'Sidebar', name: 'LEADS', parentName: 'SALES', selector: "a[title='Leads'],a:contains('Leads')" },
  { position: 'Sidebar', name: 'NEW_USER_QUEUE', parentName: 'ADMIN', selector: "a[title='New User Queue'],a:contains('New User Queue')" },
  { position: 'Sidebar', name: 'FACILITY_QUEUE', parentName: 'ADMIN', selector: "a[title='Facility Queue'],a:contains('Facility Queue')" },
  { position: 'Sidebar', name: 'PRODUCTS', parentName: 'ADMIN', selector: "a[title='Products'],a:contains('Products')" },
  { position: 'Sidebar', name: 'NEW_PRODUCT_QUEUE', parentName: 'ADMIN', selector: "a[title='New Product Queue'],a:contains('New Product Queue')" },
  { position: 'Sidebar', name: 'REPORTS', parentName: 'ADMIN', selector: "a[title='Reports'],a:contains('Reports')" },
  { position: 'Sidebar', name: 'MAINTENANCE', parentName: 'DASHBOARD', selector: "a[title='Maintenance'],a:contains('Maintenance')" },
  { position: 'Sidebar', name: 'BRANDS', parentName: 'ADMIN', selector: "a[title='Brands'],a:contains('Brands')" },
  { position: 'Sidebar', name: 'WORK_ORDERS', parentName: null, selector: "a[title='Work Orders'],a:contains('Work Orders')" },
];

function getParentLocations(locationName, parentsList = []) {
  const location = locations.find(loc => loc.name === locationName);
  if (location) {
    if (location.parentName) {
      getParentLocations(location.parentName, parentsList);
    }
    parentsList.push(location);
  }
  return parentsList;
}

function navigateTo(locationName) {
  const locationNames = locations.map(loc => loc.name);
  if (!locationNames.includes(locationName)) {
    throw new Error('Tried to navigate to nonexisting location');
  }
  const navigationOrder = getParentLocations(locationName, []);
  const parentNavigation = navigationOrder.slice(0, -1);
  const navigationLink = navigationOrder[navigationOrder.length - 1];

  parentNavigation.forEach(location => {
    if (location.position === 'Sidebar') {
      new NavigationLink(location.selector).openMenu();
    }
    // Add Header logic if needed
  });
  new NavigationLink(navigationLink.selector).goTo();
}

function navigatePageTo(urlKey) {
  let url = config[(urlKey || '').toUpperCase() + '_APP_URL'] || urlKey;
  if (!/^https?:\/\//.test(url)) {
    url = 'https://' + url;
  }
  cy.visit(url);
}

module.exports = { navigateTo, navigatePageTo };
