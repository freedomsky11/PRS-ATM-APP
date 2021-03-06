import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import { useStore } from 'store';
import { PrsAtm, sleep, Producer } from 'utils';

const Description = observer(() => {
  const { modalStore, accountStore, snackbarStore } = useStore();
  const { desc } = modalStore.description.props;
  const state = useLocalStore(() => ({
    description: desc,
    submitting: false,
    done: false,
  }));

  const submit = React.useCallback(async () => {
    if (state.submitting) {
      return;
    }
    runInAction(() => {
      state.submitting = true;
    });
    await sleep(200);
    modalStore.verification.show({
      pass: async (privateKey: string, accountName: string) => {
        try {
          await Producer.register(privateKey, accountName, state.description);
          runInAction(() => {
            state.submitting = false;
            state.done = true;
          });
          await sleep(300);
          modalStore.description.hide();
          await sleep(200);
          snackbarStore.show({
            message: `保存成功`,
          });
        } catch (err) {
          console.log(err.message);
        }
      },
      cancel: () => {
        runInAction(() => {
          state.submitting = false;
        });
      },
    });
  }, []);

  React.useEffect(() => {
    return () => {
      PrsAtm.tryCancelPolling();
    };
  }, []);

  return (
    <div className="bg-white rounded-12 text-center">
      <Fade in={true} timeout={500}>
        <div className="py-8 px-12 text-center">
          <div className="w-75">
            <div className="text-18 font-bold text-gray-700">
              编辑{accountStore.isDeveloper ? '应用名称' : '简介'}
            </div>
            <div>
              <div className="pt-3" />
              <TextField
                className="w-full"
                type="text"
                placeholder={
                  accountStore.isDeveloper ? '请输入应用名称' : '请输入简介'
                }
                size="small"
                multiline
                rows={4}
                value={state.description}
                autoFocus={true}
                inputProps={{ maxLength: 138 }}
                onChange={(e) => {
                  runInAction(() => {
                    state.description = e.target.value;
                  });
                }}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                    e.target.blur();
                    submit();
                  }
                }}
                margin="dense"
                variant="outlined"
              />
              <div className="mt-5">
                <Button
                  onClick={() => submit()}
                  fullWidth
                  isDoing={state.submitting}
                  isDone={state.done}
                >
                  确定
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
});

export default observer(() => {
  const { modalStore } = useStore();
  const { open } = modalStore.description;

  return (
    <Dialog
      open={open}
      onClose={() => {
        modalStore.description.hide();
      }}
    >
      <div>
        <Description />
      </div>
    </Dialog>
  );
});
