import { useEffect, useState } from 'react';
import { GadgetClientJava } from 'lib/axios';

interface IGadgetClientInitialized {
  gadgetClientInitialized: boolean;
}

export const useInitGadgetClient = (): IGadgetClientInitialized => {
  const [gadgetClientInitialized, setGadgetClientInitialized] = useState(false);
  useEffect(() => {
    const initGadgetClient = async () => {
      await GadgetClientJava.setClient();
      setGadgetClientInitialized(true);
    };
    initGadgetClient();
  }, []);
  return { gadgetClientInitialized: gadgetClientInitialized };
};
