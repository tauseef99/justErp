// frontend/src/components/common/OfferMessage.jsx
import React from 'react';
import { FaDollarSign, FaClock, FaCheck, FaTimes, FaCreditCard, FaExclamationTriangle, FaSpinner, FaArrowRight } from 'react-icons/fa';

const OfferMessage = ({ offer, currentUser, onAccept, onReject, onPay, isProcessing }) => {
  const isBuyer = currentUser?.role === 'buyer' || !offer.sellerId?._id;
  const canAccept = isBuyer && offer.status === 'sent';
  const canPay = isBuyer && offer.status === 'accepted';
  const hasPendingPayment = isBuyer && offer.status === 'accepted' && offer.paymentSessionId;
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'sent': return 'Pending Acceptance';
      case 'accepted': return 'Accepted - Ready for Payment';
      case 'rejected': return 'Rejected';
      case 'paid': return 'Paid - Work in Progress';
      case 'in_progress': return 'Work in Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  // Format price with proper currency
  const formatPrice = (price, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };

  return (
    <div className="bg-white border-2 border-[#708238]/20 rounded-xl p-4 max-w-md shadow-sm">
      {/* Offer Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{offer.title}</h3>
          <div className={`text-xs px-2 py-1 rounded-full mt-1 ${getStatusColor(offer.status)}`}>
            {getStatusText(offer.status)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#708238]">
            {formatPrice(offer.price, offer.currency)}
          </div>
          <div className="text-xs text-gray-500">{offer.currency?.toUpperCase() || 'USD'}</div>
        </div>
      </div>

      {/* Offer Details */}
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">{offer.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 space-x-4">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{offer.deliveryTime || offer.deliveryDays} days delivery</span>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="mr-1" />
            <span>{offer.revisions === 99 ? 'Unlimited' : (offer.revisions || 1)} revisions</span>
          </div>
        </div>

        {/* Requirements */}
        {offer.requirements && offer.requirements.length > 0 && offer.requirements[0] !== '' && (
          <div className="mt-2">
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Requirements:</h4>
            <ul className="text-xs text-gray-600 list-disc list-inside">
              {offer.requirements.slice(0, 3).map((req, index) => (
                <li key={index}>{req}</li>
              ))}
              {offer.requirements.length > 3 && (
                <li className="text-gray-400">+{offer.requirements.length - 3} more</li>
              )}
            </ul>
          </div>
        )}

        {/* Inclusions */}
        {offer.inclusions && offer.inclusions.length > 0 && offer.inclusions[0] !== '' && (
          <div className="mt-2">
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Includes:</h4>
            <ul className="text-xs text-gray-600 list-disc list-inside">
              {offer.inclusions.slice(0, 3).map((inc, index) => (
                <li key={index}>{inc}</li>
              ))}
              {offer.inclusions.length > 3 && (
                <li className="text-gray-400">+{offer.inclusions.length - 3} more</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* ✅ FIXED: Action Buttons with better flow */}
      {isBuyer && (
        <div className="flex space-x-2">
          {canAccept && (
            <>
              <button
                onClick={() => onAccept(offer._id)}
                disabled={isProcessing}
                className="flex-1 bg-[#708238] hover:bg-[#5a6a2d] text-white py-2 px-4 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Accept & Pay
                  </>
                )}
              </button>
              <button
                onClick={() => onReject(offer._id)}
                disabled={isProcessing}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center justify-center"
              >
                <FaTimes className="mr-2" />
                Reject
              </button>
            </>
          )}
          
          {/* Show payment button for accepted offers without session */}
          {canPay && !hasPendingPayment && (
            <button
              onClick={() => onPay(offer._id)}
              disabled={isProcessing}
              className="flex-1 bg-[#FFA500] hover:bg-[#e59400] text-white py-2 px-4 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <FaCreditCard className="mr-2" />
                  Pay Now
                </>
              )}
            </button>
          )}

          {/* Show pending payment status */}
          {hasPendingPayment && (
            <button
              onClick={() => window.location.reload()} // Simple reload to check status
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition flex items-center justify-center"
            >
              <FaArrowRight className="mr-2" />
              Complete Payment
            </button>
          )}

          {offer.status === 'paid' && (
            <div className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
              <FaCheck className="inline mr-2" />
              Payment Complete
            </div>
          )}

          {offer.status === 'rejected' && (
            <div className="flex-1 bg-red-100 text-red-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
              <FaTimes className="inline mr-2" />
              Offer Rejected
            </div>
          )}

          {offer.status === 'in_progress' && (
            <div className="flex-1 bg-yellow-100 text-yellow-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
              <FaExclamationTriangle className="inline mr-2" />
              Work in Progress
            </div>
          )}

          {offer.status === 'completed' && (
            <div className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
              <FaCheck className="inline mr-2" />
              Completed
            </div>
          )}
        </div>
      )}

      {!isBuyer && offer.status === 'sent' && (
        <div className="text-xs text-gray-500 text-center py-2">
          Waiting for buyer's response...
        </div>
      )}

      {/* Offer Metadata */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Offer ID: {offer._id?.substring(0, 8)}...</span>
          <span>Sent: {new Date(offer.createdAt).toLocaleDateString()}</span>
        </div>
        {offer.paymentSessionId && (
          <div className="mt-1 text-blue-600">
            Payment session: {offer.paymentSessionId.substring(0, 8)}...
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferMessage;