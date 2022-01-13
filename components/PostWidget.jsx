import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {

  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories, slug)
        .then((result) => setRelatedPosts(result))
    } else {
      getRecentPosts()
        .then((result) => setRelatedPosts(result))
    }
  }, [slug]); console.log(relatedPosts)

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8' >
      <h3 className='text-xl mb-8 font-semibold border-b pb-4' >
        {slug ? 'Related Posts' : 'Recent Posts'}  
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none' >
            <Image
              className='align-middle rounded-full'
              src={post.featuredImage.url}
              alt={post.title}
              width={60}
              height={60}
            />
          </div>
          <div className='flex-grow ml-4'>
            <p>
              {moment(post.createdAt).format('DD MMMM, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} >
              {post.title}  
            </Link>            
          </div>
        </div>
      ))}      
    </div>
    )    
}

export default PostWidget
