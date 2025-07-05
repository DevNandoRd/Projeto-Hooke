import { useState, useCallback } from 'react';

/**
 * Custom hook for phone number management and validation
 */
export const usePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = useCallback((value) => {
    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    
    // Limit to 13 characters (country code + area code + number)
    const limitedValue = cleanValue.slice(0, 13);
    
    return limitedValue;
  }, []);

  const handlePhoneNumberChange = useCallback((e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedValue);
  }, [formatPhoneNumber]);

  const isValidPhoneNumber = useCallback(() => {
    // Basic validation: should have at least 10 digits (area code + number)
    return phoneNumber.length >= 10;
  }, [phoneNumber]);

  const getFormattedPhoneNumber = useCallback(() => {
    // Remove any non-digit characters for WhatsApp link
    return phoneNumber.replace(/\D/g, '');
  }, [phoneNumber]);

  return {
    phoneNumber,
    handlePhoneNumberChange,
    isValidPhoneNumber,
    getFormattedPhoneNumber,
    setPhoneNumber
  };
};

