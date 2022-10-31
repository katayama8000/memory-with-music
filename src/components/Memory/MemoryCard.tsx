import { Card, Image, Skeleton } from '@mantine/core';
import Link from 'next/link';
import { memo } from 'react';

type Props = {
  id: number;
  artist: string;
  image: string;
  memory: string;
  song: string;
};

export const MemoryCard: React.FC<Props> = memo(({ id, artist, image, memory, song }) => {
  return (
    <div>
      <Card withBorder={true} className='hover:opacity-70 sm:m-0 '>
        <Link
          href={{
            pathname: '/articles/article-content',
            query: {
              id: id,
              artist: artist,
              image: image,
              memory: memory,
              song: song,
            },
          }}
        >
          <a className='text-inherit no-underline'>
            <div className='flex '>
              {image && (
                <Image src={image} alt={artist} height={60} width={80} radius='md' withPlaceholder className='mr-5' />
              )}
              <div className='truncate'>
                {song}/{artist}
                <br />
                {memory}
              </div>
            </div>
          </a>
        </Link>
      </Card>
    </div>
  );
});

MemoryCard.displayName = 'MemoryCard';

export const SkeletonCard: React.FC = memo(() => {
  return (
    <div>
      <Card withBorder={true} className='hover:opacity-70 sm:m-0 '>
        <div className='flex justify-start'>
          <Skeleton height={60} width={80} radius='md' className='mr-5' />
          <div>
            <Skeleton height={20} width={450} mt={8} radius='md' className='mr-5' />
            <Skeleton height={20} width={450} mt={8} radius='md' className='mr-5' />
          </div>
        </div>
      </Card>
    </div>
  );
});
SkeletonCard.displayName = 'SkeletonCard';