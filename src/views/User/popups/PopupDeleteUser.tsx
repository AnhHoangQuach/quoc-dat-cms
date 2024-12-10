import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogTitle} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { authService, queryClient } from 'services';

type PopupProps = PopupController & {
  id: string;
};

const PopupDeleteUser = ({ id, onClose }: PopupProps) => {
  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: authService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authService.fetchUsers'],
      });
      onClose();
    },
    onError: (error) => {
      console.error('Xóa user thất bại:', error); // Log lỗi nếu có
    },
  });

  const handleClickSubmit = () => {
    deleteUser(id); // Gửi ID user cần xóa
  };

  return (
    <>
      <DialogTitle>Bạn chắc chắn muốn xoá không ?</DialogTitle>
      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Không
        </LoadingButton>
        <LoadingButton variant='contained' color='error' loading={isPending} onClick={handleClickSubmit}>
          Có
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupDeleteUser;
