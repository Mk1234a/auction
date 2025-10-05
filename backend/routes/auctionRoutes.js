const express = require('express');
const {
  getAuctions,
  getAuctionById,
  createAuction,
  updateAuction,
  deleteAuction,
} = require('../controllers/auctionController');
const router = express.Router();

router.route('/').get(getAuctions).post(createAuction);
router
  .route('/:id')
  .get(getAuctionById)
  .put(updateAuction)
  .delete(deleteAuction);

module.exports = router;