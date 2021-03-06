jest.mock('api/ocpExport');

import { runExport } from 'api/ocpExport';
import { OcpReportType } from 'api/ocpReports';
import { FetchStatus } from 'store/common';
import { createMockStoreCreator } from 'store/mockStore';
import { wait } from 'testUtils';
import * as actions from './ocpExportActions';
import { ocpExportReducer, stateKey } from './ocpExportReducer';
import * as selectors from './ocpExportSelectors';

const createExportStore = createMockStoreCreator({
  [stateKey]: ocpExportReducer,
});

const runExportMock = runExport as jest.Mock;

const mockExport: string = 'data';

const query = 'query';
const reportType = OcpReportType.cost;

runExportMock.mockResolvedValue({ data: mockExport });

window.URL.createObjectURL = jest.fn();
window.URL.revokeObjectURL = jest.fn();

test('default state', () => {
  const store = createExportStore();
  expect(selectors.selectExportState(store.getState())).toMatchSnapshot();
});

test('fetch export success', async () => {
  const store = createExportStore();
  store.dispatch(actions.exportReport(reportType, query));
  expect(runExportMock).toBeCalled();
  expect(selectors.selectExportFetchStatus(store.getState())).toBe(
    FetchStatus.inProgress
  );
  await wait();
  const finishedState = store.getState();
  expect(selectors.selectExport(finishedState)).toMatchSnapshot();
  expect(selectors.selectExportFetchStatus(finishedState)).toBe(
    FetchStatus.complete
  );
  expect(selectors.selectExportError(finishedState)).toBe(null);
});

test('fetch export failure', async () => {
  const store = createExportStore();
  const error = Symbol('export error');
  runExportMock.mockRejectedValueOnce(error);
  store.dispatch(actions.exportReport(reportType, query));
  expect(runExport).toBeCalled();
  expect(selectors.selectExportFetchStatus(store.getState())).toBe(
    FetchStatus.inProgress
  );
  await wait();
  const finishedState = store.getState();
  expect(selectors.selectExportFetchStatus(finishedState)).toBe(
    FetchStatus.complete
  );
  expect(selectors.selectExportError(finishedState)).toBe(error);
});
