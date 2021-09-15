import React from 'react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="p-10 max-w-screen bg-red-900 text-blue-400">
      INdex33333333 汉字呢 汉字呢<Link to="/about">About</Link>
    </div>
  );
};
export default Index;
