import { Card, Image, Skeleton } from '@mantine/core';
import type { ArticleCardModel } from '@type/card.model';
import Link from 'next/link';
import type { FC } from 'react';
import { memo } from 'react';

export const ArticleCard: React.FC<ArticleCardModel> = memo(({ id, artist, image, memory, song }) => {
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
          <div className='flex'>
            {image && (
              <Image src={image} alt={artist} height={60} width={80} radius='md' withPlaceholder className='mr-5' />
            )}
            <div className='truncate'>
              {song}/{artist}
              <br />
              {memory}
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
});

ArticleCard.displayName = 'ArticleCard';

export const SkeletonCard: FC = memo(() => {
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
