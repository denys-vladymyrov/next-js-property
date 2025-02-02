'use client';
import { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from 'react-toastify';
import { IProperty } from '@/models/Property';

const BookmarkButton = ({ property } : { property: IProperty }) => {
  const { data: session } = useSession();
  const userId = session?.user?.name;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(true);


  useEffect(() => {
    if (!userId) {
      setIsUser(false);
      return;
    }

    checkBookmarkStatus(property._id as string).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
      setIsUser(true);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property');
      return;
    }

    bookmarkProperty(property._id as string).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };

  if (loading && isUser) return <p className='text-center'>Loading...</p>;

  if (!isUser) return null;

  return isBookmarked  ? (
    <button
      onClick={handleClick}
      className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      <FaBookmark className='mr-2' /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
    >
      <FaBookmark className='mr-2' /> Bookmark Property
    </button>
  );
};
export default BookmarkButton;
