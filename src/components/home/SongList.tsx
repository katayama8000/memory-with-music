import { SongCard } from '@components/home/SongCard';
import { useLocale } from '@hooks/useLocale';
import { Grid } from '@mantine/core';
import type { ResultModel } from '@type/result.model';
import dynamic from 'next/dynamic';

const SkeletonCard = dynamic(() => {
  return import('./SongCard').then((module) => {
    return module.SkeletonCard;
  });
});

type Props = {
  loading: boolean;
  songList: ResultModel;
};

const NUMBER_OF_SKELETONS = Array.from(Array(9).keys());

export const SongList: React.FC<Props> = ({ loading, songList }) => {
  const { t } = useLocale();
  return (
    <div>
      {songList?.resultCount !== 0 ? (
        <div>
          <Grid>
            {loading &&
              NUMBER_OF_SKELETONS.map((item) => {
                return (
                  <Grid.Col xs={6} sm={4} className='mx-1 sm:mx-0' key={item}>
                    <div className='px-1 sm:mx-0'>
                      <SkeletonCard />
                    </div>
                  </Grid.Col>
                );
              })}
            {songList?.results?.map((song, index) => {
              return (
                <Grid.Col xs={6} sm={4} key={index}>
                  <div className='px-1 sm:mx-0'>
                    <SongCard
                      url={song.artworkUrl100}
                      artistName={song.artistName}
                      trackName={song.trackName}
                      releaseDate={song.releaseDate}
                      loading={loading}
                    />
                  </div>
                </Grid.Col>
              );
            })}
          </Grid>
        </div>
      ) : (
        <div className='pt-10 text-center text-xl font-bold'>{t.NOSONG}</div>
      )}
    </div>
  );
};
