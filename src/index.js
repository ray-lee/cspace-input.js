import AutocompleteInput from './components/AutocompleteInput';
import Button from './components/Button';
import CheckboxInput from './components/CheckboxInput';
import ComboBoxInput from './components/ComboBoxInput';
import CompoundInput from './components/CompoundInput';
import CustomCompoundInput from './components/CustomCompoundInput';
import DateInput from './components/DateInput';
import DateTimeInput from './components/DateTimeInput';
import DropdownMenuInput from './components/DropdownMenuInput';
import FileInput from './components/FileInput';
import FilteringDropdownMenuInput from './components/FilteringDropdownMenuInput';
import IDGeneratorInput from './components/IDGeneratorInput';
import InputTable from './components/InputTable';
import Label from './components/Label';
import LineInput from './components/LineInput';
import MiniButton from './components/MiniButton';
import MultilineInput from './components/MultilineInput';
import PasswordInput from './components/PasswordInput';
import PrefixFilteringDropdownMenuInput from './components/PrefixFilteringDropdownMenuInput';
import RichTextInput from './components/RichTextInput';
import QuickSearchInput from './components/QuickSearchInput';
import RecordTypeInput from './components/RecordTypeInput';
import ReadOnlyInput from './components/ReadOnlyInput';
import RepeatingInput from './components/RepeatingInput';
import StructuredDateInput from './components/StructuredDateInput';
import TabularCompoundInput from './components/TabularCompoundInput';
import TextInput from './components/TextInput';
import TermPickerInput from './components/TermPickerInput';
import VocabularyInput from './components/VocabularyInput';
import UploadInput from './components/UploadInput';

import changeable from './enhancers/changeable';
import committable from './enhancers/committable';
import labelable from './enhancers/labelable';
import nestable from './enhancers/nestable';
import repeatable from './enhancers/repeatable';
import standalone from './enhancers/standalone';
import withLabeledOptions from './enhancers/withLabeledOptions';
import withNormalizedOptions from './enhancers/withNormalizedOptions';

import * as pathHelpers from './helpers/pathHelpers';

export const baseComponents = {
  AutocompleteInput,
  Button,
  CheckboxInput,
  CompoundInput,
  CustomCompoundInput,
  DateInput,
  DateTimeInput,
  DropdownMenuInput,
  FileInput,
  FilteringDropdownMenuInput,
  IDGeneratorInput,
  InputTable,
  Label,
  LineInput,
  MiniButton,
  MultilineInput,
  PasswordInput,
  PrefixFilteringDropdownMenuInput,
  QuickSearchInput,
  ReadOnlyInput,
  RecordTypeInput,
  RepeatingInput,
  RichTextInput,
  StructuredDateInput,
  TabularCompoundInput,
  TextInput,
  TermPickerInput,
  VocabularyInput,
  UploadInput,
};

export const components = {
  Button,
  CompoundInput,
  Label,
  MiniButton,
  RepeatingInput,
  AutocompleteInput: repeatable(labelable(AutocompleteInput)),
  CheckboxInput: labelable(CheckboxInput),
  ComboBoxInput: repeatable(labelable(withLabeledOptions(ComboBoxInput))),
  CustomCompoundInput: repeatable(labelable(CustomCompoundInput)),
  DateInput: repeatable(labelable(DateInput)),
  DateTimeInput: labelable(DateTimeInput),
  DropdownMenuInput: repeatable(labelable(withNormalizedOptions(DropdownMenuInput))),
  FileInput: labelable(FileInput),
  IDGeneratorInput: repeatable(labelable(IDGeneratorInput)),
  InputTable: labelable(InputTable),
  LineInput: standalone(LineInput),
  MultilineInput: standalone(MultilineInput),
  OptionPickerInput: repeatable(
    labelable(withLabeledOptions(withNormalizedOptions(PrefixFilteringDropdownMenuInput)))
  ),
  PasswordInput: standalone(PasswordInput),
  ReadOnlyInput: labelable(ReadOnlyInput),
  QuickSearchInput: labelable(QuickSearchInput),
  RecordTypeInput: labelable(RecordTypeInput),
  RichTextInput: labelable(RichTextInput),
  StructuredDateInput: repeatable(labelable(StructuredDateInput)),
  TabularCompoundInput: labelable(TabularCompoundInput),
  TextInput: standalone(TextInput),
  VocabularyInput: labelable(VocabularyInput),
  TermPickerInput: repeatable(labelable(TermPickerInput)),
  UploadInput: labelable(UploadInput),
};

export const enhancers = {
  changeable,
  committable,
  labelable,
  nestable,
  repeatable,
  standalone,
  withLabeledOptions,
  withNormalizedOptions,
};

export const helpers = {
  pathHelpers,
};
