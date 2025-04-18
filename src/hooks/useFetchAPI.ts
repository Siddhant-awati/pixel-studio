import { useState, useEffect } from "react";
import axios from "axios";
import { ImageType } from "../types/types";

interface ServiceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetchAPI = () => {
  const fetchImages = (
    page: number,
    limit: number = 9
  ): ServiceState<ImageType[]> => {
    const [state, setState] = useState<ServiceState<ImageType[]>>({
      data: null,
      loading: false,
      error: null,
    });

    useEffect(() => {
      const getImages = async () => {
        setState((prev) => ({ ...prev, loading: true }));
        try {
          const response = await axios.get(
            `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
          );
          setState({ data: response.data, loading: false, error: null });
        } catch (err) {
          setState({
            data: null,
            loading: false,
            error: "Error, failed to load images..!!",
          });
        }
      };
      getImages();
    }, [page, limit]);

    return state;
  };

  const fetchImageById = (id: string): ServiceState<ImageType> => {
    const [state, setState] = useState<ServiceState<ImageType>>({
      data: null,
      loading: false,
      error: null,
    });

    useEffect(() => {
      const getImage = async () => {
        setState((prev) => ({ ...prev, loading: true }));
        try {
          const response = await axios.get(
            `https://picsum.photos/id/${id}/info`
          );
          setState({ data: response.data, loading: false, error: null });
        } catch (err) {
          setState({
            data: null,
            loading: false,
            error: "Error, failed to load image..!!",
          });
        }
      };
      getImage();
    }, [id]);

    return state;
  };

  return { fetchImages, fetchImageById };
};
