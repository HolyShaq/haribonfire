"use client";

interface PrivateProps {
  id?: number;
}

export default function Bonfire({ id }: PrivateProps) {
  return <div>Private Chat with Person {id}</div>;
}
