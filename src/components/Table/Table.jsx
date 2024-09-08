import styled from 'styled-components';
import { formatNumberWithCommas } from '../../../utils/common.js';

const TableComponent = styled.table`
  width: 100%;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const Thead = styled.thead`
  height: 70px;
  border-bottom: 1px solid #000;
`;

const TheadTd = styled.th`
  position: relative;
  font-size: 18px;
  font-weight: 500;

  &:before {
    content: '';
    position: absolute;
    margin-top: -8px;
    top: 50%;
    left: 0;
    width: 1px;
    height: 16px;
    background: #ddd;
  }

  &:first-child {
    &:before {
      display: none;
    }
  }
`;

const Tbody = styled.tbody`
  tr {
    height: 70px;
    border-top: 1px solid #ddd;
    &:first-child {
      border-top: 0;
    }
  }
`;

const TbodyTd = styled.td`
  padding: 0 25px;
  max-width: 0;
  font-size: 18px;
  font-weight: normal;
  text-align: ${props => props.$align || 'center'};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Table = ({ th, td, alignments = {}, colgroup }) => {
  const tdKeys = Array.from(new Set(td.flatMap(obj => Object.keys(obj))));

  const formatTd = value => {
    if (typeof value === 'number') {
      return formatNumberWithCommas(value);
    }
    return value;
  };

  return (
    <TableComponent>
      {colgroup}
      <Thead>
        <tr>
          {th.map(item => (
            <TheadTd key={item}>{item}</TheadTd>
          ))}
        </tr>
      </Thead>
      <Tbody>
        {td.map(item => (
          <tr key={item.id}>
            {tdKeys.map(key => (
              <TbodyTd key={key + item.id} $align={alignments[key]}>
                {formatTd(item[key])}
              </TbodyTd>
            ))}
          </tr>
        ))}
      </Tbody>
    </TableComponent>
  );
};
