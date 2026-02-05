
export interface Discount {
  code: string;
  amount: number; // If < 1, it's a percentage (e.g. 0.1 = 10%). If >= 1, it's a flat amount.
}

export const PaymentService = {
  validateReferralCode: async (code: string): Promise<Discount> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedCode = code.trim().toUpperCase();

    // Mock validation logic
    if (normalizedCode === "SAVE10") {
      return { code: normalizedCode, amount: 0.1 }; // 10% off
    } else if (normalizedCode === "WELCOME20") {
      return { code: normalizedCode, amount: 20 }; // $20 off
    } else {
      throw new Error("Invalid referral code");
    }
  },

  processPayment: async (courseId: string, method: string, amount: number): Promise<boolean> => {
     // Simulate network delay
     await new Promise((resolve) => setTimeout(resolve, 2000));
     
     // Mock successful payment
     if (amount < 0) {
         throw new Error("Invalid amount");
     }
     return true;
  }
};
