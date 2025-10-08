// frontend/src/components/common/OfferMessage.jsx
import React, { useState } from 'react';
import { FiClock, FiDollarSign, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import { FaCreditCard, FaSpinner } from 'react-icons/fa';

const OfferMessage = ({ offer, onAccept, onReject, onPay, currentUser }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionType, setActionType] = useState('');

  const isSeller = currentUser?.role === 'seller';
  const isBuyer = currentUser?.role === 'buyer';

  const handleAccept = async () => {
    setIsProcessing(true);
    setActionType('accept');
    try {
      await onAccept(offer._id);
    } catch (error) {
      console.error('Error accepting offer:', error);
    } finally {
      setIsProcessing(false);
      setActionType('');
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    setActionType('reject');
    try {
      await onReject(offer._id);
    } catch (error) {
      console.error('Error rejecting offer:', error);
    } finally {
      setIsProcessing(false);
      setActionType('');
    }
  };

  const handlePay = async () => {
    setIsProcessing(true);
    setActionType('pay');
    try {
      await onPay(offer._id);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setIsProcessing(false);
      setActionType('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'sent': return 'Offer Sent';
      case 'accepted': return 'Accepted - Awaiting Payment';
      case 'rejected': return 'Rejected';
      case 'in_progress': return 'Work in Progress';
      case 'completed': return 'Completed';
      case 'paid': return 'Paid';
      default: return status;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 max-w-md">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{offer.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(offer.status)}`}>
            {getStatusText(offer.status)}
          </span>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-[#708238]">${offer.price}</div>
          <div className="text-xs text-gray-500 flex items-center">
            <FiClock className="mr-1" />
            {offer.deliveryDays} days delivery
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{offer.description}</p>

      {/* Requirements & Inclusions */}
      <div className="space-y-3 mb-4">
        {offer.requirements && offer.requirements.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Requirements:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {offer.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {offer.inclusions && offer.inclusions.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Included:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {offer.inclusions.map((inc, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <span className="font-medium">Revisions:</span> {offer.revisions === 99 ? 'Unlimited' : offer.revisions}
        </div>
      </div>

      {/* Actions */}
      {isBuyer && offer.status === 'sent' && (
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            disabled={isProcessing}
            className="flex-1 bg-[#708238] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#5a6a2d] transition disabled:opacity-50 flex items-center justify-center"
          >
            {isProcessing && actionType === 'accept' ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FiCheck className="mr-2" />
            )}
            Accept Offer
          </button>
          <button
            onClick={handleReject}
            disabled={isProcessing}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50 flex items-center justify-center"
          >
            {isProcessing && actionType === 'reject' ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FiX className="mr-2" />
            )}
            Reject
          </button>
        </div>
      )}

      {isBuyer && offer.status === 'accepted' && (
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-[#FFA500] text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-[#e59400] transition disabled:opacity-50 flex items-center justify-center"
        >
          {isProcessing && actionType === 'pay' ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            <FaCreditCard className="mr-2" />
          )}
          Pay Now - ${offer.price}
        </button>
      )}

      {isSeller && offer.status === 'sent' && (
        <div className="text-center text-sm text-gray-500 py-2">
          Waiting for buyer to respond...
        </div>
      )}

      {isSeller && offer.status === 'accepted' && (
        <div className="text-center text-sm text-green-600 py-2 flex items-center justify-center">
          <FiCheck className="mr-2" />
          Offer accepted - Waiting for payment
        </div>
      )}

      {isSeller && offer.status === 'paid' && (
        <div className="text-center text-sm text-green-600 py-2">
          Payment received! Start working on the order.
        </div>
      )}

      {/* Expiry Notice */}
      {offer.status === 'sent' && offer.expiresAt && new Date(offer.expiresAt) < new Date() && (
        <div className="mt-2 text-xs text-red-600 flex items-center">
          <FiAlertCircle className="mr-1" />
          This offer has expired
        </div>
      )}
    </div>
  );
};

export default OfferMessage;