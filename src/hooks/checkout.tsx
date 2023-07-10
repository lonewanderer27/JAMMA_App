// import { useRecoilState, useRecoilValue } from "recoil";
// import { errorState, loadingState, sessionState } from "../atoms/atoms";

import {
  defaultAddressAtom,
  deliveryAddressesAtom,
  noteAtom,
  selectedVoucherAtom,
} from "../atoms/checkout";
import { useEffect, useState } from "react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import { Coupon } from "../types/jamma";
import { PostgrestError } from "@supabase/supabase-js";
import { profileState } from "../atoms/atoms";
import { setDefaultAddress } from "../utils/checkout";
import { vouchersAtom } from "../atoms/vouchers";

// import { useEffect } from "react";
// import { getUserAddresses } from "../utils/checkout";

export function useSetDefaultAddress() {
  const profile = useRecoilValue(profileState);
  const defaultAddress = useRecoilValue(defaultAddressAtom);
  const addressesRefresher = useRecoilRefresher_UNSTABLE(deliveryAddressesAtom);
  const [error, setError] = useState<PostgrestError>();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (address_id: number) => {
    setIsLoading(true);

    const { error: error2 } = await setDefaultAddress(profile!.id, address_id);
    if (error2) {
      setError(error2);
    } else {
      addressesRefresher();
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [defaultAddress]);

  return { defaultAddress, handleChange, error, isLoading };
}

export function useCheckout() {
  const vouchers = useRecoilValue(vouchersAtom);
  const [selectedVoucher, setSelectedVoucher] =
    useRecoilState(selectedVoucherAtom);
  const [message, setMessage] = useRecoilState(noteAtom);

  const messageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const voucherChange = (voucher_id: string | null) => {
    if (!voucher_id) {
      setSelectedVoucher(null);
      return;
    }

    console.log("voucher_id: ", voucher_id);
    const voucher = vouchers.find(
      (voucher: Coupon) => voucher.id.toString() === voucher_id
    ); // specify the type of the vouchers array
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setSelectedVoucher(voucher!);
  };

  return {
    message,
    messageChange,
    vouchers: vouchers,
    selectedVoucher: selectedVoucher,
    voucherChange,
  };
}