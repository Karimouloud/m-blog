import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { getCategories } from '../services';



const Header = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, []);

  return (
    <div className='container mx-auto px-10 mb-8' >
      <div className='border-b w-full inline-block border-blue-400 py-8' >
        <div className='block md:float-left' >
          <Link href="/">
            <span className='cursor-pointer font-bold text-4xl text-white' >
              M-BLOG
            </span>
          </Link>    
        </div>
        <div className='hidden md:float-left md:contents' >
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className='text-white font-semibold align-middle ml-4 mt-2 md:float-right cursor-pointer'>
                {category.name}
              </span>
            </Link>
          ) )}
        </div>    
      </div>         
    </div>
  )
}

export default Header;
