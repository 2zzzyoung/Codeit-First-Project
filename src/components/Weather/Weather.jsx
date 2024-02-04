import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { weatherState } from '../../atom/atom';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { positionOptions } from '../../utils/positionOptions';
import { getWeatherData } from '../../api/api';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import * as S from './WeatherStyle';

export default function Weather() {
  const { location, error } = useCurrentLocation(positionOptions);
  const [weather, setWeather] = useRecoilState(weatherState);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {
      if (error) {
        return console.log('Geolocation error:', error);
      }
      if (location) {
        try {
          if (
            !lastUpdateTime ||
            Date.now() - lastUpdateTime > 5 * 60 * 1000 ||
            !weather.weather
          ) {
            const weatherData = await getWeatherData(
              location?.latitude,
              location?.longitude,
            );

            // 불러온 날씨 데이터로 city, weather, temp 설정
            setWeather({
              icon: weatherData?.weather[0]?.icon,
              weather: weatherData?.weather[0]?.main,
              city: weatherData?.name,
              temp: `${weatherData?.main?.temp}°C`,
            });

            // 데이터를 가져왔을 때의 시간을 저장
            setLastUpdateTime(Date.now());
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    // 처음 마운트될 때 한 번 호출
    fetchWeather();

    // 5분마다 호출
    const intervalId = setInterval(fetchWeather, 5 * 60 * 1000);

    // 컴포넌트가 언마운트되면 interval 제거
    return () => clearInterval(intervalId);
  }, [location, error, setWeather, lastUpdateTime, weather]);

  return (
    <S.WeatherContainer>
      {weather.weather ? (
        <S.WeatherTracker>
          <S.City>
            <p>{weather.city}</p>
            <p>{weather.weather}</p>
          </S.City>
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
            alt="날씨 이미지"
          />
          <p>{weather.temp}</p>
        </S.WeatherTracker>
      ) : (
        <LoadingSpinner error={error} />
      )}
    </S.WeatherContainer>
  );
}
