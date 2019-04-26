let GeoLocation = require('../api_models/geoBranch');

const homepageCtrlr = (req, res) => {
  res.render('frontpage', { title: 'ravenIoT', strapline: 'Please enter a location' });
};

const geoprofileCtrlr = (req, res) => {
  res.render('geoProfiler');
};

const BSTableCtrlr = (req, res, next) => {
  GeoLocation.find()
    .sort({ branchNumber: 'ascending' })
    .exec(function (err, branches) {
      if (err) { return next(err); }
      res.render('locationsBSTable', { title: 'Bootstrap LocationsTable - Mongodb data', branches: branches });
    });
};

const branchmapCtrlr = (req, res) => {
  res.render('locationsMapbox', { title: 'Mapbox Map - Vector Graphics / Mongo Data' });
};

const geoPostCtrlr = (req, res, next) => {
  let branchNumber = req.body.branchNumber;
  let city = req.body.city;
  let lat = parseFloat(req.body.lat);
  let lng = parseFloat(req.body.lng);

  GeoLocation.findOne({ branchNumber: branchNumber }, function (err, branch) {
    if (err) { return next(err); }
    if (branch) {
      console.log(`Branch ${branchNumber} already registered`);
      return res.redirect('/geoProfile');
    }

    let newBranch = new GeoLocation({
      branchNumber: branchNumber,
      city: city,
      location:
      { type: 'Point', coordinates: [lng, lat] }
    });
    newBranch.save();
  });
  res.redirect('geoProfile');
};

// api controller for table data
const dataCtrlr = (req, res, next) => {
  GeoLocation.find()
    // .select({branchNumber, city, coordinates})
    .sort({ branchNumber: 'ascending' })
    .exec(function (err, locations) {
      if (err) { return next(err); }
      console.log(`dataCtrlr: ${locations}`);
      res.json(locations);
    });
};



module.exports = {
  homepageCtrlr,
  geoprofileCtrlr,
  BSTableCtrlr,
  geoPostCtrlr,
  dataCtrlr,
  branchmapCtrlr
};
