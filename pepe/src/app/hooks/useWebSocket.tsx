// hooks/useWebSocketSWR.ts
import useSWRSubscription from 'swr/subscription';
import { useEffect } from 'react';

interface WebSocketPayload {
  method: string;
  keys: string[];
}

const useWebSocketSWR = (url: string) => {
  const { data, error } = useSWRSubscription(url, (key, { next }) => {
    let isSubscribed = false;
    const ws = new WebSocket(key);

    ws.onopen = () => {
      if (!isSubscribed) {
        const payload: WebSocketPayload = {
          method: 'subscribeTokenTrade',
          keys: ['5rJNNbr2Ai7WbQcqDwjLMfpdQ85yniUWm1Y6ADunmRx8']
        };
        ws.send(JSON.stringify(payload));
        isSubscribed = true;
      }
    };

    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);
      next(null, result);
    };

    ws.onerror = (err) => {
      next(err, null);
    };

    return () => {
      ws.close();
    };
  });

  return { data, error };
};

export default useWebSocketSWR;
