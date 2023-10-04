"use client";

import { useState } from "react";

type ClientProps = {
  params: {
    username: string;
  };
};

const Client = ({ params }: ClientProps) => {
  return (
    <div>
      <h1 className="text-white text-xl">Oie!!!! {params.username}</h1>
    </div>
  );
};

export default Client;
