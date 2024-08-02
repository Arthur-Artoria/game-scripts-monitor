'use client';

import Image from 'next/image';
import { Client, IMessage } from '@stomp/stompjs';
import { useCallback, useEffect, useState } from 'react';


const useClient = () => {
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://api.artoria.cn/game-scripts-controller/ws',
      onConnect: () => setClient(client),
    });
    client.activate();
  }, []);

  return client;
};

export default function Home() {
  const client = useClient();
  const [shot, setShot] = useState<string>();

  const handleShotReceived = useCallback((message: IMessage) => {
    setShot(JSON.parse(message.body).content);
  }, []);

  const handleShotClick = useCallback(() => {
    const body = { content: '', sender: '风暴' }; 
    client?.publish({ destination: '/app/monitoring', body: JSON.stringify(body) });
  }, [client]);

  useEffect(() => {
    client?.subscribe('/topic/shot', handleShotReceived);
  }, [client, handleShotReceived]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button onClick={handleShotClick}>获取图片</button>
      <div className="w-full flex-1 relative">
        {shot && <Image src={shot} alt="shot" fill objectFit="contain" />}</div>
    </main>
  );
}
