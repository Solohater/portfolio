'use client';
import { useEffect } from 'react';

export default function TestPage() {
  useEffect(() => {
    window.location.replace('/');
  }, []);
  return null;
}