import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDashboardStats,
  getChartData,
  getPrivateData,
  createData,
  updateData,
  deleteData,
  searchData,
  exportData,
} from '../services/api';

// Dashboard statistics hook
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Chart data hook
export const useChartData = (chartType, period = 'week') => {
  return useQuery({
    queryKey: ['chartData', chartType, period],
    queryFn: () => getChartData(chartType, period),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Data management hooks
export const useData = (params = {}) => {
  return useQuery({
    queryKey: ['data', params],
    queryFn: () => getPrivateData(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createData,
    onSuccess: () => {
      // Invalidate and refetch data queries
      queryClient.invalidateQueries({ queryKey: ['data'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });
};

export const useUpdateData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => updateData(id, data),
    onSuccess: (updatedData, { id }) => {
      // Update the specific item in cache
      queryClient.setQueryData(['data'], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data?.map(item => 
            item.id === id ? { ...item, ...updatedData } : item
          ) || []
        };
      });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });
};

export const useDeleteData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteData,
    onSuccess: (_, deletedId) => {
      // Remove the item from cache
      queryClient.setQueryData(['data'], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data?.filter(item => item.id !== deletedId) || []
        };
      });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });
};

// Search hook
export const useSearchData = (query, filters = {}) => {
  return useQuery({
    queryKey: ['search', query, filters],
    queryFn: () => searchData(query, filters),
    enabled: !!query, // Only run query if there's a search term
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Export hook
export const useExportData = () => {
  return useMutation({
    mutationFn: ({ format, filters }) => exportData(format, filters),
  });
};

// Combined data management hook
export const useDataManagement = () => {
  const createMutation = useCreateData();
  const updateMutation = useUpdateData();
  const deleteMutation = useDeleteData();
  const exportMutation = useExportData();

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    export: exportMutation.mutate,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    error: createMutation.error || updateMutation.error || deleteMutation.error,
  };
}; 