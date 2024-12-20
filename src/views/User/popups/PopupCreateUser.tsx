import { LoadingButton } from '@mui/lab';
import { DialogActions, DialogContent, DialogTitle, Grid2, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { authService, queryClient } from 'services';

const PopupCreateUser = ({ onClose }: PopupController) => {
  const { control, handleSubmit } = useForm({ mode: 'onChange' });

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: authService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authService.fetchUsers'],
      });
      onClose();
    },
  });

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      createUser({
        ...(values as UserPayloadType),
      });
    })();
  };

  return (
    <>
      <DialogTitle>Tạo tài khoản</DialogTitle>

      <DialogContent>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <Controller
              name='name'
              defaultValue=''
              rules={{
                required: 'Tên không được để trống',
                minLength: {
                  value: 3,
                  message: 'Tên phải có ít nhất 3 ký tự',
                },
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Tên' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid2>

          <Grid2 size={12}>
            <Controller
              name='email'
              defaultValue=''
              rules={{
                required: 'Email không được để trống',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@gmail.com$/i,
                  message: 'Email không hợp lệ',
                },
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Email' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid2>

          <Grid2 size={12}>
            <Controller
              name='password'
              defaultValue=''
              rules={{
                required: 'Mật khẩu không được để trống',
                minLength: {
                  value: 8,
                  message: 'Pass phải có ít nhất 8 ký tự',
                },
              }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} fullWidth label='Mật khẩu' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid2>
        </Grid2>
      </DialogContent>

      <DialogActions>
        <LoadingButton variant='outlined' color='inherit' onClick={onClose}>
          Hủy
        </LoadingButton>
        <LoadingButton variant='contained' color='success' loading={isPending} onClick={handleClickSubmit}>
          Tạo
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default PopupCreateUser;
