import { useState, useEffect } from 'react';
import { Project, EmployeeResponse } from '../types';
import { getEmployee, saveEmployee } from '../services/employees'

interface Props {
    projects: Project[];
}

const ProfileForm = ({ projects }: Props) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [techStack, setTechStack] = useState('');
    const [projectIds, setProjectIds] = useState<number[]>([]);
    const [projectDuration, setProjectDuration] = useState('short');
    const [additionalSkills, setAdditionalSkills] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const populateForm = (data: EmployeeResponse) => {
        setFullName(data.full_name);
        setEmail(data.email);
        setExperienceLevel(data.experience_level);
        setTechStack(data.tech_stack);
        setProjectDuration(data.project_duration);
        setAdditionalSkills(data.additional_skills ?? '');
        setProjectIds(data.projects.map(p => p.id));
    }

    useEffect(() => {
        const savedEmail = sessionStorage.getItem('email');
        if (!savedEmail) {
            return;
        }
        getEmployee(savedEmail).then(data => {
            if (data) {
                populateForm(data)
                setMessage(`Welcome back, ${data.full_name}.`)
                setTimeout(() => setMessage(''), 3000);
            }
        });
    }, []);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = await saveEmployee({
                full_name: fullName.trim(),
                email: email.trim(),
                experience_level: experienceLevel,
                tech_stack: techStack,
                project_duration: projectDuration,
                additional_skills: additionalSkills.trim() || null,
                project_ids: projectIds,
            });
            setMessage(`Profile saved! Welcome, ${data.full_name}.`);
            sessionStorage.setItem('email', data.email);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
            setTimeout(() => setError(''), 3000);
        }
    }

    const handleClear = () => {
        setFullName('');
        setEmail('');
        setExperienceLevel('');
        setTechStack(''); setProjectIds([]); setProjectDuration('');
        setAdditionalSkills(''); setConfirmed(false);
        setMessage(''); 
        setError('');
        sessionStorage.removeItem('email');
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Telia Project Assignment Form</h2>
            <p>Complete your profile to get assigned to internal projects.</p>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <label htmlFor="full-name">Full Name *</label><br />
                <input type="text" id="full-name" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Mari Maasikas" required/>
            </div>

            <div>
                <label htmlFor="email">Email Address *</label><br />
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}  placeholder='mari.maasikas@gmail.com' required/>
            </div>

            <div>
                <label htmlFor="experience-level">Experience Level *</label>
                <select id="experience-level" value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} required>
                    <option value="">Select your level</option>
                    <option value="junior">Junior (0-2 years)</option>
                    <option value="mid-level">Mid-level (2-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                </select>
            </div>

            <div>
                <label htmlFor="tech-stack">Primary Technology Stack *</label>
                <select id="tech-stack" value={techStack} onChange={e => setTechStack(e.target.value)} required>
                    <option value="">Choose one</option>
                    <option value="backend">Backend Development</option>
                    <option value="frontend">Frontend Development</option>
                    <option value="fullstack">Full-Stack Development</option>
                    <option value="data">Data Engineering</option>
                    <option value="devops">DevOps</option>
                    <option value="mobile">Mobile Development</option>
                </select>
            </div>

            <div>
                <label style={{ display: 'block' }}>Available Projects (Hold down ctrl to select multiple)</label>
                <select
                    multiple={true}
                    size={10}
                    value={projectIds.map(String)}
                    onChange={e => setProjectIds([...e.target.selectedOptions].map(o => parseInt(o.value)))}
                    required
                >
                    {projects.map(p => (
                        <option key={p.id} value={String(p.id)}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Preferred Project Duration *</label>
                <div>
                    <input type="radio" id="short" name="project_duration" value="short" checked={projectDuration === 'short'} onChange={() => setProjectDuration('short')} />
                    <label htmlFor="short">Short-term (1-3 months)</label>
                </div>
                <div>
                    <input type="radio" id="medium" name="project_duration" value="medium" checked={projectDuration === 'medium'} onChange={() => setProjectDuration('medium')} />
                    <label htmlFor="medium">Medium-term (3-6 months)</label>
                </div>
                <div>
                    <input type="radio" id="long" name="project_duration" value="long" checked={projectDuration === 'long'} onChange={() => setProjectDuration('long')} />
                    <label htmlFor="long">Long-term (6+ months)</label>
                </div>
            </div>

            <div>
                <label htmlFor="additional-skills">Additional Skills (optional)</label>
                <input type="text" id="additional-skills" value={additionalSkills} onChange={e => setAdditionalSkills(e.target.value)} placeholder="e.g., Python, Docker, React" />
            </div>

            <div>
                <input type="checkbox" id="confirm" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} required/>
                <label htmlFor="confirm">I confirm my availability for the selected projects</label>
            </div>

            <div className="button-row">
                <button type="submit">Save Profile</button>
                <button type="button" onClick={handleClear}>Clear Form</button>
            </div>
        </form>
    );
}

export default ProfileForm;