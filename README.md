# Switch to Spec

This extension adds a keybinding to switch between the spec file and the code file.

## How it works?

Spec files should have one of the spec suffixes:

`.spec`, `.test`, `_spec`, `_test`, `-spec`, or `-test`

And it must have the same folder structure as the code file.

See some folder structure examples bellow:

### Example 1:

Code file: `src/services/users/create_service.rb`

Spec file: `spec/services/users/create_service_spec.rb`

### Example 2:

Code file: `src/components/cards/DashboardCard.js`

Spec file: `src/__tests__/components/cards/DashboardCard.test.js`

### Example 3:

Code file: `src/components/cards/DashboardCard.ts`

Spec file: `__tests__/components/cards/DashboardCard-test.ts`

### Example 4:

Code file: `src/components/cards/DashboardCard.ts`

Spec file: `src/__tests__/components/cards/DashboardCard-test.ts`

## How to use?

Mac OS: `ctrl+alt+t`

Windows: `ctrl+alt+t`

## Release Notes

### 0.0.2

Changed keybinding to not conflict with default command `Reopen closed editor`

Removed `when` expression while defining keybinding so editor does not need to be active to trigger
command

### 0.0.1

Initial release
