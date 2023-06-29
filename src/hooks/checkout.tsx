// import { useRecoilState, useRecoilValue } from "recoil";
// import { errorState, loadingState, sessionState } from "../atoms/atoms";
import { useEffect, useState } from "react";
import { errorState, loadingState, profileState } from "../atoms/atoms";
import { defaultAddressAtom, deliveryAddressesAtom, selectedVoucherAtom, noteAtom } from "../atoms/checkout";
// import { useEffect } from "react";
// import { getUserAddresses } from "../utils/checkout";

import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from "recoil";
import { setDefaultAddress } from "../utils/checkout";
import { vouchersAtom as vouchersAtom } from "../atoms/vouchers";
import { PostgrestError } from "@supabase/supabase-js";

export function useSetDefaultAddress() {
  const profile = useRecoilValue(profileState);
  const defaultAddress = useRecoilValue(defaultAddressAtom);
  const addressesRefresher = useRecoilRefresher_UNSTABLE(deliveryAddressesAtom);
  const [error, setError] = useState<PostgrestError>()
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = async (address_id: number) => {
    setIsLoading(true);

    const {data, error: error2} = await setDefaultAddress(profile!.id, address_id);
    if (error2) {
      setError(error2);
    } else {
      addressesRefresher();
    } 
    setIsLoading(false); 
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [defaultAddress])

  return { defaultAddress, handleChange, error, isLoading }
}

export function useCheckout() {
  const vouchers = useRecoilValue(vouchersAtom);
  const [selectedVoucher, setSelectedVoucher] = useRecoilState(selectedVoucherAtom);
  const [ message, setMessage ] = useRecoilState(noteAtom);

  const messageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const voucherChange = (voucher_id: string | null) => {
    if (!voucher_id) {
      setSelectedVoucher(null);
      return;
    }

    console.log("voucher_id: ", voucher_id)
    const coupon = vouchers.find(coupon => coupon.id.toString() === voucher_id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setSelectedVoucher(coupon!);
  }

  return { 
    message, 
    messageChange,
    vouchers: vouchers,
    selectedVoucher: selectedVoucher,
    voucherChange 
  }
}