STDK Versioning Specification
Document ID: STDK-VS-1
Applies To: All STDK projects
Scope: Internal release cycle control and milestone progression
1. Overview
STDK Versioning is a finite-cycle, tier-classified version control model designed for structured progression and forced release cadence.
Version format:
Copy code

CCC-TT-S
Where:
CCC → Cycle Number (zero-padded, 3 digits)
TT → Change Tier Declaration
S → Step Index (0–7)
Example:
Copy code

001-MJ-6
2. Version Structure
2.1 Cycle Number (CCC)
Numeric, 3 digits, zero-padded.
Starts at 001.
Increments only after a completed release.
002 represents the next major release cycle.
There is no step 8. Upon reaching step 7, the cycle must transition.
2.2 Tier Declaration (TT)
Defines the classification of change within the current cycle.
Allowed values:
Code
Meaning
Description
P
Patch
Bug fixes, small adjustments, balancing
MN
Minor
Feature additions, non-structural systems
MJ
Major
Structural overhaul, major system integration
R
Release
Finalization state for cycle
Optional (if ever needed):
Code
Meaning
RC
Release Candidate
HF
Hotfix
Only declared tiers are valid.
2.3 Step Index (S)
Integer range: 0–7
Represents progression within the cycle.
Maximum value: 7
Step 7 is the release threshold.
No version may exceed S = 7.
If progression reaches 7:
Copy code

CCC-R-7
The next version must be:
Copy code

CCC+1-R-0
3. Progression Rules
A cycle begins at:
Copy code

CCC-R-0
Patch (P) may occur at any step.
Minor (MN) may occur at any step before release.
Major (MJ) typically occurs in later steps (recommended 4–6).
Multiple MN or MJ declarations are allowed within a single cycle.
Step number must strictly increase.
No backward stepping.
No duplicate step numbers.
Step 7 enforces cycle closure.
4. Release Enforcement Rule
When:
Copy code

CCC-*-7
is reached:
Cycle must finalize.
No further steps allowed.
Next version increments cycle number.
Step resets to 0.
There is no 8th step. There is no overflow state.
5. Example Cycle
Copy code

001-R-0     → Cycle initialization
001-P-1     → Patch
001-MN-2    → Minor addition
001-P-3     → Patch
001-MJ-4    → Major system update
001-MN-5    → Minor content expansion
001-MJ-6    → Final structural update
001-R-7     → Release threshold
002-R-0     → New cycle begins
6. Design Philosophy
STDK Versioning enforces:
Structured progression
Forced release cadence
Controlled scope growth
Finite iteration boundaries
Mechanical clarity
It is intentionally:
Non-semantic
Non-industry-standard
Internally consistent
Thematically aligned with controlled system architecture
7. In-Game Display Format (Optional)
For public display:
Copy code

Version 002
For internal or dev display:
Copy code

002-MJ-4
8. Immutability Clause
Once a version identifier is assigned and published, it must never be altered retroactively.
